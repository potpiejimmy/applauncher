import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaLauncherComponent } from './pwa-launcher';

describe('PwaLauncherComponent', () => {
  let component: PwaLauncherComponent;
  let fixture: ComponentFixture<PwaLauncherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwaLauncherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwaLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
