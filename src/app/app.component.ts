import { Component, OnInit } from '@angular/core';
import { Algorithms } from './enums/algorithms-enums';
import { Colors } from './enums/colors-enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SortingVisualizer';

  barHeights: number[] = [];
  barHeightsForReset: number[] = [];
  maxHeight = 400;
  numberOfBars = 20;
  speed = 250;
  algorithm = Algorithms.NONE;

  constructor() {

  }

  ngOnInit() {
    for(let i = 0; i < this.numberOfBars; i++) {
      this.barHeights.push(Math.round(Math.random() * this.maxHeight + 40));
    }

    this.barHeightsForReset = [...this.barHeights];
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
    // else if(algorithm === "Quick Sort") {
    //   this.algorithm = Algorithms.QUICK_SORT;
    // }
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
      let dictionary = new Map<number, number>();

      for(let i = 0; i < this.barHeights.length; i++) {
        dictionary.set(i, this.barHeights[i]);
      }

      this.mergeSort(dictionary);
    }
    // else if(this.algorithm === Algorithms.QUICK_SORT) {
    //   this.quickSort();
    // }
  }

  async bubbleSort() {

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

          await this.delay(this.speed);

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
    for(let i = 0; i < this.numberOfBars - 1; i++) {
      let min = this.barHeights[i];
      let minIndex = i;

      for(let j = i; j < this.numberOfBars; j++) {
        let element2 = document.getElementsByClassName('' + j)[0] as HTMLElement;
        element2.style.backgroundColor = Colors.SELECTED;
        await this.delay(this.speed);

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

  async insertionSort() {
    for(let i = 1; i <= this.numberOfBars - 1; i++) {
      let selectedBar = document.getElementsByClassName('' + i)[0] as HTMLElement;

      selectedBar.style.backgroundColor = Colors.SELECTED;
      await this.delay(this.speed);

      if(this.barHeights[i] < this.barHeights[i - 1]) {

        let j = i;

        while(j > 0 && this.barHeights[j] < this.barHeights[j - 1]) {
          selectedBar.style.backgroundColor = Colors.SWITCH;
          let switchBar = document.getElementsByClassName('' + (j - 1))[0] as HTMLElement;
          switchBar.style.backgroundColor = Colors.SWITCH;

          await this.delay(this.speed);

          let temp = this.barHeights[j - 1];
          this.barHeights[j - 1] = this.barHeights[j];
          this.barHeights[j] = temp;

          await this.delay(this.speed);

          switchBar.style.backgroundColor = Colors.DEFAULT;

          j--;

          await this.delay(this.speed);
        }

        selectedBar.style.backgroundColor = Colors.DEFAULT;
      }
    }

    for(let i = 0; i < this.numberOfBars; i++) {
      (document.getElementsByClassName('' + i)[0] as HTMLElement).style.backgroundColor = Colors.SORTED;
    }
  }

  async mergeSort(dictionary: Map<number, number>) {

    if(dictionary.size === 1) {
      return dictionary;
    }

    let middle = Math.floor(dictionary.size / 2);

    let left = await this.mergeSort(new Map(Array.from(dictionary).slice(0, middle)));
    let right = await this.mergeSort(new Map(Array.from(dictionary).slice(middle, dictionary.size)));

    let i = 0;
    let j = 0;
    let sortedMap = new Map();

    while(i < left.size && j < right.size) {

      if(Array.from(left)[i][1] < Array.from (right)[j][1]) {
        sortedMap.set(Array.from(left)[i][0], Array.from(left)[i][1]);
        i++;
      }

      else if(Array.from(right)[j][1] < Array.from(left)[i][1]) {

        let selectedBar = document.getElementsByClassName('' + i)[0] as HTMLElement;
        selectedBar.style.backgroundColor = Colors.SELECTED;
        await this.delay(this.speed);

        let temp = this.barHeights[Array.from(left)[i][0]];
        this.barHeights[Array.from(left)[i][0]] = this.barHeights[Array.from(right)[j][0]];
        this.barHeights[Array.from(right)[j][0]] = temp;

        console.log(this.barHeights);

        let temp1 = Array.from(left)[i][0];
        Array.from(left)[i][0] = Array.from(right)[j][0];
        Array.from(right)[j][0] = temp1;

        sortedMap.set(Array.from((right))[j][0], Array.from((right))[j][1]);

        await this.delay(this.speed);

        j++;

      }
    }

    if(i < (left).size) {
      for(let e = i;  e < (left).size; e++) {
        sortedMap.set(Array.from(left)[e][0], Array.from(left)[e][1]);
      }
    }

    else if(j < (right).size) {
      for(let e = j;  e < (right).size; e++) {
        sortedMap.set(Array.from(right)[e][0], Array.from(right)[e][1]);
      }
    }

    return sortedMap;

  }

  // quickSort() {
  //   console.log('quick sort');

  // }

  reset() {
    this.barHeights = [...this.barHeightsForReset];

    for(let i = 0; i < this.numberOfBars; i++) {
      (document.getElementsByClassName('' + i)[0] as HTMLElement).style.backgroundColor = Colors.DEFAULT;
    }
  }

  newArray() {
    this.barHeights = [];
    this.ngOnInit();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
