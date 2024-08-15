import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedDialogComponent } from './unauthorized-dialog.component';

describe('UnauthorizedDialogComponent', () => {
  let component: UnauthorizedDialogComponent;
  let fixture: ComponentFixture<UnauthorizedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthorizedDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthorizedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
