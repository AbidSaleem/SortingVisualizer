import { Component } from '@angular/core';
import { Algorithms } from './enums/algorithms-enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SortingVisualizer';

  barHeights: number[] = [];
  length = 400;
  size = 80;
  algorithm = Algorithms.NONE;

  constructor() {
    for(let i = 0; i < this.size; i++) {
      this.barHeights.push(Math.round(Math.random() * this.length + 40));
    }
  }

  algorithmSelected(algorithm: string): void {
    if(algorithm === "Bubble Sort") {
      this.algorithm = Algorithms.BUBBLE_SORT;
    }
    else if(algorithm === "Selection Sort") {
      this.algorithm = Algorithms.SELECTION_SORT;
    }
    else if(algorithm === "Insertion Sort") {
      this.algorithm = Algorithms.INSERTION_SORT;
    }
    else if(algorithm === "Merge Sort") {
      this.algorithm = Algorithms.MERGE_SORT;
    }
    else if(algorithm === "Quick Sort") {
      this.algorithm = Algorithms.QUICK_SORT;
    }
  }
}
