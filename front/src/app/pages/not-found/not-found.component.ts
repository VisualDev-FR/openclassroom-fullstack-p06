import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BackArrowComponent } from '../../components/back-arrow/back-arrow.component';

@Component({
  selector: 'app-not-found',
  imports: [
    NavbarComponent,
    BackArrowComponent,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
