import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-arrow',
  imports: [],
  templateUrl: './back-arrow.component.html',
  styleUrl: './back-arrow.component.scss'
})
export class BackArrowComponent {

  @Input() url: string = "/";

  constructor(private router: Router) { }

  navigateBack(): void {
    this.router.navigate([this.url]);
  }
}
