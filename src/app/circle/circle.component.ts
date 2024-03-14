import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-circle',
  standalone: true,
  imports: [],
  templateUrl: './circle.component.html',
  styleUrl: './circle.component.css'
})
export class CircleComponent {
  @Input() pts_in_circle:number = -3;
  @Output() moveon = new EventEmitter();
}
