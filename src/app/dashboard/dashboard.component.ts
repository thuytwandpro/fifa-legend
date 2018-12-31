import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

import { AngularFireDatabase } from 'angularfire2/database';
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listManager: any[] = [];
  newManager: string
  getManager: string
  managerValid: boolean = false
  userEmail = localStorage.getItem("currentUser")
  constructor(private authService: AuthService, private af: AngularFireDatabase) {
    this.af.list('Users', ref => ref.orderByChild('email').equalTo(this.userEmail)).valueChanges().subscribe(data => {
      this.listManager = data[0]['manager']

      this.listManager = Object.keys(this.listManager).map(key => {
        return { key, ...this.listManager[key] }
      });
    }
    )
  }

  ngOnInit() {
  }

  inputCode(e) {
    if (e.trim().length > 0) {
      this.managerValid = true
    } else {
      this.managerValid = false
    }
  }

  setUser(key) {
    this.getManager = key
  }

  add() {
    if (confirm('Do you want add ?')) {
      let sub = this.af.list('Users', ref => ref.orderByChild('email').equalTo(this.userEmail)).snapshotChanges().subscribe(
        data => {
          data.forEach(dt => {
            this.af.object('Users/' + dt.payload.key + '/manager/' + this.getManager).update({
              name: this.newManager
            }).then(() => {
              alert('Action success')
              $('#addManager').modal('hide')
              this.newManager = ''
            }
            )
          })
          sub.unsubscribe()
        }
      )
    }
  }

  removeManager(key) {
    if (confirm('Do you want remove ?')) {
      let sub = this.af.list('Users', ref => ref.orderByChild('email').equalTo(this.userEmail)).snapshotChanges().subscribe(
        data => {
          data.forEach(dt => {
            this.af.object('Users/' + dt.payload.key + '/manager/' + key).update({
              name: ''
            }).then(() => {
              alert('Action success')
              $('#addManager').modal('hide')
              this.newManager = ''
            }
            )
          })
          sub.unsubscribe()
        }
      )
    }
  }

  logOut() {
    this.authService.logout()
    localStorage.setItem("logOut", "fromDashboard");
  }
}
