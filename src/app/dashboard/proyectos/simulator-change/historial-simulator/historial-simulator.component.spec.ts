import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialSimulatorComponent } from './historial-simulator.component';

describe('HistorialSimulatorComponent', () => {
  let component: HistorialSimulatorComponent;
  let fixture: ComponentFixture<HistorialSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialSimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
