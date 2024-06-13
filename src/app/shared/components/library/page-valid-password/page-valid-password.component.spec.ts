import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageValidPasswordComponent } from './page-valid-password.component';

describe('PageValidPasswordComponent', () => {
  let component: PageValidPasswordComponent;
  let fixture: ComponentFixture<PageValidPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageValidPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageValidPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
