import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'mdd-button',
  imports: [
    MatRipple,
  ],
  templateUrl: './mdd-button.component.html',
  styleUrl: './mdd-button.component.scss'
})
export class MddButtonComponent {

  @Input() caption!: string;
  @Input() type: string = "button";
  @Input() style: string = "";
  @Input() disabled: boolean = false;
  @Output() click = new EventEmitter();

  onclick(): void {
    this.click.emit();
  }

}
