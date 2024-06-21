import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
 
@Component({
  selector: 'app-dashboard', 
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private authService = inject(AuthService);
  public user = computed( () => this.authService.currentUser() ); 
  public sessionUser = this.user();
 
}
