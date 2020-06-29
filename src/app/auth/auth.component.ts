import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  authForm: FormGroup;
  status: { message: string, hasError: boolean };
  authSub: Subscription;


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.status = { message: null, hasError: null };
    this.authForm = new FormGroup(
      {
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
      }
    );
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  onToggleAuthMode() {
    this.isLoginMode = !this.isLoginMode;
    this.status = { message: null, hasError: null };
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    if (this.isLoginMode) {
      // Login
      this.authSub = this.authService.login$(email, password).subscribe(
        res => {
          this.router.navigate(['']);
        },
        err => this.status = { message: err, hasError: true }
      );

    } else {
      // Register
      this.authSub = this.authService.register$(email, password).subscribe(
        res => {
          this.status = { message: 'Register Success! Please login.', hasError: false };
          this.router.navigate(['']); // todo?
          this.authForm.reset();
        },
        err => this.status = { message: err, hasError: true }
      );
    }

  }



}
