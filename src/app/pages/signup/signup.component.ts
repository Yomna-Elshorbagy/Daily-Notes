import { CommonModule } from '@angular/common';
import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  showAnimation = false;

  apiError: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    age: new FormControl('', [Validators.required]),
  });
  registerSubmit(form: FormGroup) {
    this.isLoading = true;
    this.authService.handelRegister(form.value).subscribe({
      next: (res) => {
        console.log(res);

        this.router.navigate(['/signin']);
      },
      error: (error) => {
        this.apiError = error.error.msg;
        this.isLoading = false;
      },
    });
  }
  ngOnInit() {
    setTimeout(() => {
      this.showAnimation = true;
    }, 1000);
  }
}
