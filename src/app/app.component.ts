import { Component, OnChanges } from '@angular/core';
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
  size = 20;
  speed = 500;
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

        await this.delay(this.speed);

        if(this.barHeights[j] > this.barHeights[j + 1]) {

          let temp = this.barHeights[j];
          this.barHeights[j] = this.barHeights[j + 1];
          this.barHeights[j + 1] = temp;
          await this.delay(1);

          if(j === this.size - i - 2) {
            element1.style.backgroundColor = '#0f4851';
            continue;
          }
        }

        else {
          let element2 = document.getElementsByClassName('' + (j + 1))[0] as HTMLElement;

          element1.style.backgroundColor = '#b61f45';
          element2.style.backgroundColor = '#b61f45';

          await this.delay(500);

          element2.style.backgroundColor = '#35858B';

          if(j + 1 === this.size - i - 1) {
            element2.style.backgroundColor = '#0f4851';
          }

        }

        element1.style.backgroundColor = '#35858B';

      }
    }

    (document.getElementsByClassName('' + 0)[0] as HTMLElement).style.backgroundColor = '#0f4851';
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

    for(let i = 0; i < this.size; i++) {
      (document.getElementsByClassName('' + i)[0] as HTMLElement).style.backgroundColor = '#35858B';
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
