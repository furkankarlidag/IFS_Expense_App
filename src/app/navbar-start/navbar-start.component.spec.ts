import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarStartComponent } from './navbar-start.component';

describe('NavbarStartComponent', () => {
  let component: NavbarStartComponent;
  let fixture: ComponentFixture<NavbarStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
