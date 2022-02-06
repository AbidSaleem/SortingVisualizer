import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Algorithms } from './enums/algorithms-enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'SortingVisualizer';

  barHeights: number[] = [];
  barHeightsBackup: number[] = [];
  length = 400;
  size = 80;
  algorithm = Algorithms.NONE;

  constructor() {
    for(let i = 0; i < this.size; i++) {
      this.barHeights.push(Math.round(Math.random() * this.length + 40));
    }
  }

  ngOnChanges(): void {
      console.log("on changes");
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

  playClicked(): void {
    if(this.algorithm === Algorithms.BUBBLE_SORT) {
      this.bubbleSort();
    }
    else if(this.algorithm === Algorithms.SELECTION_SORT) {
      this.selectionSort();
    }
    else if(this.algorithm === Algorithms.INSERTION_SORT) {
      this.insertionSort();
    }
    else if(this.algorithm === Algorithms.MERGE_SORT) {
      this.mergeSort();
    }
    else if(this.algorithm === Algorithms.QUICK_SORT) {
      this.quickSort();
    }
  }

  async bubbleSort() {
    this.barHeightsBackup = [...this.barHeights];

    for(let i = 0; i < this.size - 1; i++) {
      for(let j = 0; j < this.size - i - 1; j++) {

        let element1 = document.getElementsByClassName('' + j)[0] as HTMLElement;
        element1.style.backgroundColor = '#B8405E';

        await this.delay(10);

        if(this.barHeights[j] > this.barHeights[j + 1]) {
          let temp = this.barHeights[j];
          this.barHeights[j] = this.barHeights[j + 1];
          this.barHeights[j + 1] = temp;

          await this.delay(10);
        }

        element1.style.backgroundColor = '#35858B';

      }
    }
  }

  selectionSort() {
    console.log('selection sort');

  }

  insertionSort() {
    console.log('insertion sort');

  }

  mergeSort() {
    console.log('merge sort');

  }

  quickSort() {
    console.log('quick sort');

  }

  reset() {
    this.barHeights = [...this.barHeightsBackup];
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
