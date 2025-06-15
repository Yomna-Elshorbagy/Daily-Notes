import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  private readonly formbuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  showAnimation = false;

  loginForm: FormGroup = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  loginSubmit(form: FormGroup): void {
    this.isLoading = true;
    this.authService.handelLosgin(form.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('token', '3b8ny__' + res.token);
        this.router.navigate(['/notes']);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
  ngOnInit() {
    setTimeout(() => {
      this.showAnimation = true;
    }, 1000);
  }
}
