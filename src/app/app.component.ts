import { Component, OnChanges } from '@angular/core';
import { Algorithms } from './enums/algorithms-enums';
import { Colors } from './enums/colors-enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SortingVisualizer';

  barHeights: number[] = [];
  barHeightsForReset: number[] = [];
  maxHeight = 400;
  numberOfBars = 20;
  speed = 500;
  algorithm = Algorithms.NONE;

  constructor() {
    for(let i = 0; i < this.numberOfBars; i++) {
      this.barHeights.push(Math.round(Math.random() * this.maxHeight + 40));
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
    this.barHeightsForReset = [...this.barHeights];

    for(let i = 0; i < this.numberOfBars - 1; i++) {

      for(let j = 0; j < this.numberOfBars - i - 1; j++) {

        let element1 = document.getElementsByClassName('' + j)[0] as HTMLElement;
        element1.style.backgroundColor = Colors.SELECTED;

        await this.delay(this.speed);

        if(this.barHeights[j] > this.barHeights[j + 1]) {

          let temp = this.barHeights[j];
          this.barHeights[j] = this.barHeights[j + 1];
          this.barHeights[j + 1] = temp;
          await this.delay(1);

          if(j === this.numberOfBars - i - 2) {
            element1.style.backgroundColor = Colors.SORTED;
            continue;
          }
        }

        else {
          let element2 = document.getElementsByClassName('' + (j + 1))[0] as HTMLElement;

          element1.style.backgroundColor = Colors.SWITCH;
          element2.style.backgroundColor = Colors.SWITCH;

          await this.delay(500);

          element2.style.backgroundColor = Colors.DEFAULT;

          if(j + 1 === this.numberOfBars - i - 1) {
            element2.style.backgroundColor = Colors.SORTED;
          }

        }

        element1.style.backgroundColor = Colors.DEFAULT;

      }
    }

    (document.getElementsByClassName('' + 0)[0] as HTMLElement).style.backgroundColor = Colors.SORTED;
  }

  async selectionSort() {

    this.barHeightsForReset = [...this.barHeights];

    for(let i = 0; i < this.numberOfBars - 1; i++) {
      let min = this.barHeights[i];
      let minIndex = i;

      for(let j = i; j < this.numberOfBars; j++) {
        let element2 = document.getElementsByClassName('' + j)[0] as HTMLElement;
        element2.style.backgroundColor = Colors.SELECTED;
        await this.delay(1000);

        if(this.barHeights[j] < min) {
          let previousMin = document.getElementsByClassName('' + minIndex)[0] as HTMLElement;

          if(previousMin) {
            previousMin.style.backgroundColor = Colors.DEFAULT;
          }

          min = this.barHeights[j];
          minIndex = j;

          element2.style.backgroundColor = Colors.SWITCH;
        }

        else {
          element2.style.backgroundColor = Colors.DEFAULT;
        }
      }

      let temp = this.barHeights[i];
      this.barHeights[i] = this.barHeights[minIndex];
      this.barHeights[minIndex] = temp;
      await this.delay(1);
      (document.getElementsByClassName('' + i)[0] as HTMLElement).style.backgroundColor = Colors.SORTED;
    }

    (document.getElementsByClassName('' + (this.numberOfBars - 1))[0] as HTMLElement).style.backgroundColor = Colors.SORTED;


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
    this.barHeights = [...this.barHeightsForReset];

    for(let i = 0; i < this.numberOfBars; i++) {
      (document.getElementsByClassName('' + i)[0] as HTMLElement).style.backgroundColor = Colors.DEFAULT;
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
