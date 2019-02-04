package main

import (
	"flag"
	"fmt"
	"io"
	"net/http"
	"sync"

	"github.com/nareix/joy4/av/avutil"
	"github.com/nareix/joy4/av/pubsub"
	"github.com/nareix/joy4/format"
	"github.com/nareix/joy4/format/flv"
	"github.com/nareix/joy4/format/rtmp"
)

var (
	addr = flag.String("l", ":8089", "host:port of the go-rtmp-server")
	sKey = flag.String("k", "", "Stream key, to protect your stream")
)

func init() {
	format.RegisterAll()
}

type writeFlusher struct {
	httpflusher http.Flusher
	io.Writer
}

func (self writeFlusher) Flush() error {
	self.httpflusher.Flush()
	return nil
}

func main() {
	flag.Parse()
	server := &rtmp.Server{}

	l := &sync.RWMutex{}
	type Channel struct {
		que *pubsub.Queue
	}
	channels := map[string]*Channel{}

	server.HandlePlay = func(conn *rtmp.Conn) {
		l.RLock()
		ch := channels[conn.URL.Path]
		l.RUnlock()

		if ch != nil {
			cursor := ch.que.Latest()
			avutil.CopyFile(conn, cursor)
		}
	}

	server.HandlePublish = func(conn *rtmp.Conn) {
		streams, _ := conn.Streams()

		l.Lock()
		fmt.Println("request string->", conn.URL.RequestURI())
		fmt.Println("request key->", conn.URL.Query().Get("key"))
		streamKey := conn.URL.Query().Get("key")
		if streamKey != *sKey {
			fmt.Println("Due to key not match, denied stream")
			return //If key not match, deny stream
		}
		ch := channels[conn.URL.Path]
		if ch == nil {
			ch = &Channel{}
			ch.que = pubsub.NewQueue()
			ch.que.WriteHeader(streams)
			channels[conn.URL.Path] = ch
		} else {
			ch = nil
		}
		l.Unlock()
		if ch == nil {
			return
		}

		avutil.CopyPackets(ch.que, conn)

		l.Lock()
		delete(channels, conn.URL.Path)
		l.Unlock()
		ch.que.Close()
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		l.RLock()
		ch := channels[r.URL.Path]
		l.RUnlock()

		if ch != nil {
			w.Header().Set("Content-Type", "video/x-flv")
			w.Header().Set("Transfer-Encoding", "chunked")
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.WriteHeader(200)
			flusher := w.(http.Flusher)
			flusher.Flush()

			muxer := flv.NewMuxerWriteFlusher(writeFlusher{httpflusher: flusher, Writer: w})
			cursor := ch.que.Latest()

			avutil.CopyFile(muxer, cursor)
		} else {
			fmt.Println("Request url: ", r.URL.Path)
			if r.URL.Path != "/" {
				http.NotFound(w, r)
			} else {
				homeHtml := `
				<!DOCTYPE html>
<html>
	<head>
		<title>Demo live</title>
		<style>
		body {
			margin:0;
			padding:0;
			background:#000;
		}
		
        video {
			position:absolute;
			width:100%;
			height:100%;
		}
		</style>
	</head>
	<body>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/flv.js/1.3.2/flv.min.js"></script>
		 
        <video id="videoElement" controls autoplay x5-video-player-type="h5" x5-video-player-fullscreen="true" playsinline webkit-playsinline>
            Your browser is too old which doesn't support HTML5 video.
        </video>
		<script>
if (flvjs.isSupported()) {
	var videoElement = document.getElementById('videoElement');
	var flvPlayer = flvjs.createPlayer({
		type: 'flv',
		url: '/live'
	});
	flvPlayer.attachMediaElement(videoElement);
	flvPlayer.load();
	flvPlayer.play();
}
		</script>
	</body>
</html>`
				io.WriteString(w, homeHtml)
			}
		}
	})

	go http.ListenAndServe(*addr, nil)
	fmt.Println("Listen and serve ", *addr)

	server.ListenAndServe()

	// ffmpeg -re -i movie.flv -c copy -f flv rtmp://localhost/movie
	// ffmpeg -f avfoundation -i "0:0" .... -f flv rtmp://localhost/screen
	// ffplay http://localhost:8089/movie
	// ffplay http://localhost:8089/screen
}
