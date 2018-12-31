import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from '../services/auth.service';
import { Router } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadAssetsService } from '../services/load-assets.service';
import * as $ from 'jquery'
// declare var $ :any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loadData:boolean = true;
  loadIntro:boolean = false;
  loadLogin:boolean = false;
  checkAccount:boolean = false;
  constructor(
    public afAuth: AngularFireAuth,
     private fb: FormBuilder, 
     private authService :AuthService,
     private loadAssets: LoadAssetsService,
      private router: Router
      ){
    this.loading()
  }

  ngOnInit() {
    this.buildForm()
  }

  loading(){
    if(localStorage.getItem("logOut") == "fromDashboard"){
      setTimeout(() => {
        this.loadData = false
     this.loadLogin = true  
       }, 3000);
     localStorage.removeItem("logOut")    
    }else{
    setTimeout(() => {
     this.loadData = false
     this.loadIntro = true
    }, 3000);
    setTimeout(() => {
      this.loadIntro = false
      this.loadLogin = true
    }, 8500)
  }
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      'email': ['', [
          Validators.required,
          Validators.email
        ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
    ],
    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

 formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'email':         'Email must be a valid email'
    },
    'password': {
      'required':      'Password is required.',
      'pattern':       'Password must be include at one letter and one number.',
      'minlength':     'Password must be at least 4 characters long.',
      'maxlength':     'Password cannot be more than 40 characters long.',
    }
  };

  signin(){
    this.checkAccount = true
    setTimeout(() => {
      this.authService.loginWithEmail(this.loginForm.value['email'], this.loginForm.value['password'])
    .then((res) => { 
      this.router.navigate(['dashboard'])
      })
    .catch((err) => {
      this.checkAccount = false
      alert('User or password is incorrect')
    }
      );
    }, 2000)
  }
}
