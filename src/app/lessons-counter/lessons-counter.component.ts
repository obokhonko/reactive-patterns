import {Component, OnInit} from '@angular/core';
import {store, Observer} from "../event-bus-experiments/app-data";

@Component({
  selector: 'lessons-counter',
  templateUrl: './lessons-counter.component.html',
  styleUrls: ['./lessons-counter.component.css']
})
export class LessonsCounterComponent implements OnInit, Observer {
  lessonsCounter = 0;

  ngOnInit() {
    store.$lessonsList.subscribe(this);
  }

  next(data: any) {
    this.lessonsCounter = data.length;
  }
}
