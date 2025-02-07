import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    AsyncPipe,
    NgClass,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isMobile$!: Observable<Boolean>;
  showLateralMenu: boolean = false;

  constructor(
    private sessionService: SessionService,
    private layoutService: LayoutService,
  ) { }

  @Input() currentPage: string = "";

  ngOnInit(): void {
    this.isMobile$ = this.layoutService.isMobile$();
  }

  isLogged(): boolean {
    return this.sessionService.isLogged;
  }

  toggleLateralMenu(): void{
    this.showLateralMenu = !this.showLateralMenu;
  }
}
