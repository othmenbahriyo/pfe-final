import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParkComponent } from './add-park.component';

describe('AddParkComponent', () => {
  let component: AddParkComponent;
  let fixture: ComponentFixture<AddParkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
