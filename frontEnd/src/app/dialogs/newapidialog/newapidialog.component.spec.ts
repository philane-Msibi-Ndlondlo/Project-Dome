import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewapidialogComponent } from './newapidialog.component';

describe('NewapidialogComponent', () => {
  let component: NewapidialogComponent;
  let fixture: ComponentFixture<NewapidialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewapidialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewapidialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
