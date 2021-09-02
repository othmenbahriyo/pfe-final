import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GparkComponent } from './gpark.component';

describe('GparkComponent', () => {
  let component: GparkComponent;
  let fixture: ComponentFixture<GparkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GparkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GparkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
