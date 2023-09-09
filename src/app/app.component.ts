import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth'
import {  Router , ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socialButterfly';
  auth = new FirebaseTSAuth();

  constructor(private loginSheet: MatBottomSheet,private route:Router,private activatedRoute:ActivatedRoute ) {
    this.auth.listenToSignInStateChanges(
      user =>{
        this.auth.checkSignInState(
          {
            whenSignedIn: user =>{
              alert('logged in')
            },
            whenSignedOut:user =>{
              alert('logged out')
            },
            whenSignedInAndEmailNotVerified:user =>{

            },
            whenSignedInAndEmailVerified:user => {
              
            },
            whenChanged:user =>{

            }
          }
        )
      }
    )
  }

  loggedIn(){
    return this.auth.isSignedIn()
  }
  logoutButtonClicked(){
    this.auth.signOut();
    alert('logged out')
  }
  
  openBottomSheet(): void {
    this.loginSheet.open(AuthenticatorComponent);
  } 

}
