import {Component, OnInit} from '@angular/core';
import {store} from "../event-bus-experiments/app-data";
import {Observer} from "rxjs";
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements Observer<Lesson[]>, OnInit {
  lessonsCounter = 0;

  ngOnInit() {
    store.lessonsList$.subscribe(this);
  }

  next(data: Lesson[]) {
    this.lessonsCounter = data.length;
  }

  complete() {
    console.info('Completed');
  }

  error(err: any) {
    console.error(err);
  }
}
