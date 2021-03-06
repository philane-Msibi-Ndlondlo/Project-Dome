import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  @Output() logOutEvent = new EventEmitter();
  username: any;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.username = this.auth.userData;
  }

  logUserOut() {
    this.logOutEvent.emit();
  }

}
