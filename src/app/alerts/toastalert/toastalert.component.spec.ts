import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastalertComponent } from './toastalert.component';

describe('ToastalertComponent', () => {
  let component: ToastalertComponent;
  let fixture: ComponentFixture<ToastalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastalertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
