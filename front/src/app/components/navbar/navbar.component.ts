import { Component, Input } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { CommonModule, NgStyle } from '@angular/common';
import { environment } from '../../../environments/environment';
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

    if (environment.debug) {
      return true;
    }

    return this.sessionService.isLogged
  }
}
