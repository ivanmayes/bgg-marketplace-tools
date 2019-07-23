import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPricesPage } from './import-prices.page';

describe('ImportPricesPage', () => {
  let component: ImportPricesPage;
  let fixture: ComponentFixture<ImportPricesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPricesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPricesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
