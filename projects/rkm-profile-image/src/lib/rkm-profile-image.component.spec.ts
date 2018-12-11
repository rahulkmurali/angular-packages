import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkmProfileImageComponent } from './rkm-profile-image.component';

describe('RkmProfileImageComponent', () => {
  let component: RkmProfileImageComponent;
  let fixture: ComponentFixture<RkmProfileImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkmProfileImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkmProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
