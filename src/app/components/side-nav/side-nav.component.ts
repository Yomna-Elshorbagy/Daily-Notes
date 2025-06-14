import { AuthService } from '../../core/services/auth.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  readonly authService = inject(AuthService)
}
