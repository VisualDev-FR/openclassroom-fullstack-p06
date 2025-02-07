import { Component, Input } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
    private sessionService: SessionService,
    protected router: Router,
  ) { }

  @Input() currentPage: string = "";

  isLogged(): boolean {
    return this.sessionService.isLogged
  }
}
