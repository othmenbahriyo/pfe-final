import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceGestionComponent } from './place-gestion.component';

describe('PlaceGestionComponent', () => {
  let component: PlaceGestionComponent;
  let fixture: ComponentFixture<PlaceGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
