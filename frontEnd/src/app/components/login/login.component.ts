import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private auth: AuthService, private fb: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])]
    });
  }

  onLoginUser(form) {

    if (!form.valid) {
      this.toastr.error('Please fill all fields correctly!', 'Error');
      return;
    }

    this.auth.loginUser({email: form.value.email, password: form.value.password}).subscribe((response) => {
      if (response.status === 'Success') {
        this.toastr.success(response.message, response.status);
        this.auth.setTokenAndData(response);
        this.router.navigate(['/dashboard']);
      }
    }, (err) => {
      this.toastr.error(err.error.message, err.error.status);
    });
  }

}
