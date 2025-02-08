import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-home',
  imports: [
    MatRipple,
    AsyncPipe,
    NgClass,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  isMobile$!: Observable<Boolean>;

  constructor(
    private router: Router,
    private layoutService: LayoutService,
  ) { }

  ngOnInit(): void {
    this.isMobile$ = this.layoutService.isMobile$();
  }

  redirectToLogin(): void {
    this.router.navigate(["/login"])
  }

  redirectToRegister(): void {
    this.router.navigate(["/register"])
  }
}
