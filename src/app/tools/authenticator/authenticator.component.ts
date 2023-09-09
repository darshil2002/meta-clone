import { Component,Output, EventEmitter  } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent {

  @Output() closed = new EventEmitter<void>();
  @Output() showToast = new EventEmitter<string>();

  state  = AuthenticatorCompState.LOGIN
  firebaseAuth!:FirebaseTSAuth

  registrationForm: FormGroup;
  loginForm:FormGroup;
  forgotPasswordForm:FormGroup;

  constructor(private fb: FormBuilder, 
              private bottomSheetRef:MatBottomSheet,
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute){
    this.firebaseAuth=new FirebaseTSAuth();

    // forms 

    // Register Form 
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
    // Register ends

    //forgot password
    this.forgotPasswordForm=this.fb.group({
      email:['',[Validators.required,Validators.email]]
    })
    //forgot password ends

    // login form 
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
    // login form ends

  }
  onForgotPasswordButtonClick(){
    this.state= AuthenticatorCompState.FORGOT_PASSWORD;
  }
  onCreateAcountButtonClick(){
    this.state= AuthenticatorCompState.REGISTER;
  }
  onLoginButtonClick(){
    this.state= AuthenticatorCompState.LOGIN;
  }  
  getState(){
    switch (this.state){
      case AuthenticatorCompState.LOGIN : return "Login"
      case AuthenticatorCompState.FORGOT_PASSWORD : return "Forgot Password"
      case AuthenticatorCompState.REGISTER: return "Register"
    }
  }
  isLoginState(){
    return this.state == AuthenticatorCompState.LOGIN;
  }
  isRegisterState(){
    return this.state == AuthenticatorCompState.REGISTER;
  }
  isForgotPasswordState(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }
  onRegisterClick(){
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      let email = this.registrationForm.value.email;
      let password = this.registrationForm.value.password;
      // let confirmPassword = this.registrationForm.value.confirmPassword;

      this.firebaseAuth.createAccountWith({
        email:email,
        password:password,

        onComplete: (uc)=>{
          this.showToast.emit('Account created successfully')
          this.registrationForm.value.email= '',
          this.registrationForm.value.password='',
          this.registrationForm.value.confirmPassword='',
          this.state= AuthenticatorCompState.LOGIN;
        },
        onFail: (error)=>{
          this.showToast.emit('Unable to  created successfully')
        }
      })
    }

  }
  onResetPasswordClick(){
    if(this.forgotPasswordForm.valid){
      console.log(this.forgotPasswordForm.value);
      let email=this.forgotPasswordForm.value.email;

      this.firebaseAuth.sendPasswordResetEmail(
        {
          email:email,
          onComplete:(res)=>{
            this.showToast.emit('We have shared a link to reset password')
            this.state= AuthenticatorCompState.LOGIN;
          }
        }
      )
    }
  }
  onLoginClick(){
    if(this.loginForm.valid){
     console.log(this.loginForm.value)
     let email = this.loginForm.value.email;
     let password= this.loginForm.value.password;

    this.firebaseAuth.signInWith(
      {
        email:email,
        password:password,

        onComplete: (userCredentials) => {
          this.closed.emit();
          this.bottomSheetRef.dismiss();
          // this.router.navigate(['profile']);
          this.router.navigate(['/profile']);
        },

        onFail:(error)=>{
          this.showToast.emit('wrong password');
        }
      },
    );
   } 
  }

  isRegistrationFormValid(){
    return this.passwordsMatch(this.registrationForm.value.password,
                               this.registrationForm.value.confirmPassword)
  }
  
  passwordsMatch(password:string , confirmPassword:string): boolean {
    return password === confirmPassword;
  }
     
}
export enum AuthenticatorCompState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}