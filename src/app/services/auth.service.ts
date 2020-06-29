import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public fireAuth: AngularFireAuth,
  ) { }

  register$(email: string, password: string) {
    return from(this.fireAuth.createUserWithEmailAndPassword(email, password));
  }

  login$(email: string, password: string) {
    return from(this.fireAuth.signInWithEmailAndPassword(email, password));
  }

  logout() {
    return from(this.fireAuth.signOut());
  }

  checkCurrentUser$() {
    return this.fireAuth.user;
  }

}
