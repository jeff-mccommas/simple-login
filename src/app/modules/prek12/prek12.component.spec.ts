import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Prek12Component } from './prek12.component';

describe('Prek12Component', () => {
  let component: Prek12Component;
  let fixture: ComponentFixture<Prek12Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Prek12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Prek12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
