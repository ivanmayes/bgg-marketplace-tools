import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapeModalPage } from './scrape-modal.page';

describe('ScrapeModalPage', () => {
  let component: ScrapeModalPage;
  let fixture: ComponentFixture<ScrapeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrapeModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
