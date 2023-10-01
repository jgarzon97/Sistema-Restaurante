import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaNuevaComponent } from './mesa.nueva.component';

describe('MesaNuevaComponent', () => {
  let component: MesaNuevaComponent;
  let fixture: ComponentFixture<MesaNuevaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesaNuevaComponent]
    });
    fixture = TestBed.createComponent(MesaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
