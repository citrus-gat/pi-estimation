import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [ NgFor ],
  templateUrl: './random.component.html',
  styleUrl: './random.component.css'
})
export class RandomComponent {
  randoms:[number, number][] = [];

  stats:{description: string, value: number }[] = [];

  @Output() moveon = new EventEmitter();
  @Output() in_circle = new EventEmitter<number>();

  // log() {
  //   console.log('step');
  // }

  getRandoms() {
    // Replace the randoms array with 1000 random points (x, y) inside the unit square 
    // https://stackoverflow.com/a/43044960
    this.randoms = Array.from({length: 1000}, () => [Math.random()*2-1, Math.random()*2-1]);
  }

  getNum(idx: number) {
    try {
      return this.randoms[idx];
    } catch (error) {
      throw error;
    }
  }

  locatePt(x: number, y: number) {
    if (y > Number.EPSILON) {
      return (x > Number.EPSILON) ? '1' : (x < 0) ? '2' : 'x';
    } else if (y < -Number.EPSILON) {
      return (x < -Number.EPSILON) ? '3' : (x > 0) ? '4' : 'x';
    } else {
      // on y-axis
      return (Math.abs(x) > Number.EPSILON) ? 'y' : 'o';
    }
  }

  getStats() {
   
    if (this.randoms.length !== 0) {
      let statsX = {min: NaN, max: NaN, mean: NaN, variance: NaN,}, 
        statsY = {min: NaN, max: NaN, mean: NaN, variance: NaN,},
        randomsX = Array.from(this.randoms, (x, y) => x),
        randomsY = Array.from(this.randoms, (x, y) => y);   
      // TODO   
      const locations = this.randoms.map(p => this.locatePt(...p));
      const numO = locations.filter(loc => loc === 'o').length;
      this.stats = [
        {description: "Quardrant 1", value: locations.filter(loc => loc === '1').length},
        {description: "Quardrant 2", value: locations.filter(loc => loc === '2').length},
        {description: "Quardrant 3", value: locations.filter(loc => loc === '3').length},
        {description: "Quardrant 4", value: locations.filter(loc => loc === '4').length},
        // {description: "Origin", value: numO},
        // {description: "# pt on x-axis", value: locations.filter(loc => loc === 'x').length + numO}, 
        // {description: "# pt on y-axis", value: locations.filter(loc => loc === 'y').length + numO},
      ];

      // this.in_circle = this.randoms.filter(p => p[0]**2 + p[1]**2 < 1).length;
    } 
    return this.stats;
  }

  output_in_circle_ctn() {
    this.in_circle.emit(this.randoms.filter(p => p[0]**2 + p[1]**2 < 1).length);
  }

  // get stats_info() {
  //   let info = "";
  //   if (this.stats) {}
  //   for (const [property, value] of Object.entries(this.stats)) {
  //     info = info + property + value;
  //   }
  //   return "<h2>Hello</h2>";
  // }

}
