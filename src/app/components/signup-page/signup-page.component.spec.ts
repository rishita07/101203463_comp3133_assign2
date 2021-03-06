import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignupComponent } from './signup-page.component';

describe('UserSignupComponent', () => {
  let component: UserSignupComponent;
  let fixture: ComponentFixture<UserSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
