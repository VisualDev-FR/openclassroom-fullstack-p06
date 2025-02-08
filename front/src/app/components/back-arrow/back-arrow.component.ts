import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-arrow',
  imports: [],
  templateUrl: './back-arrow.component.html',
  styleUrl: './back-arrow.component.scss'
})
export class BackArrowComponent {

  @Input() url: string | undefined;

  constructor(
    private router: Router,
    private location: Location,
  ) { }

  navigateBack(): void {
    if (this.url) {
      this.router.navigate([this.url]);
    }
    else {
      this.location.back();
    }
  }
}
