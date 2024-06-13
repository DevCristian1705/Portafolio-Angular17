import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorChangeComponent } from './simulator-change.component';

describe('SimulatorChangeComponent', () => {
  let component: SimulatorChangeComponent;
  let fixture: ComponentFixture<SimulatorChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulatorChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulatorChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
