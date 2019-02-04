import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePage } from './live.page';

describe('LivePage', () => {
  let component: LivePage;
  let fixture: ComponentFixture<LivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
