import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from "rxjs";

@Injectable()
export class AuthService  {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
constructor(private _firebaseAuth: AngularFireAuth, private router: Router) { 
  this._firebaseAuth.auth.signOut()
      this.user = _firebaseAuth.authState;
      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            localStorage.setItem("currentUser", user.email);
          }
          else {
            this.userDetails = null;
          }
        }
      );
  }
  signUpWithEmail(email: string, password: string) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
  }
  loginWithEmail(email: string, password: string) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }
signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }
signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }
signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }
isLoggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }
logout() {
    this._firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }
}