import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { RandomComponent } from './random/random.component';
import { CircleComponent } from './circle/circle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, RouterOutlet, RandomComponent, CircleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string = 'π estimation';
  maxSteps:number = 5;
  step:number = 2;

  pts_in_circle:number = -1;

  logstep() {
    console.log(this.step);
  }

  backward() {
    if (this.step > 1) {
      this.step -= 1;
    }
  }
  advance() {
    if (this.step < this.maxSteps) {
      this.step += 1;
    }
  }
}
