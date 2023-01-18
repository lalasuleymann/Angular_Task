import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantedPermissionsComponent } from './granted-permissions.component';

describe('AllPermissionsComponent', () => {
  let component: GrantedPermissionsComponent;
  let fixture: ComponentFixture<GrantedPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantedPermissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantedPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});