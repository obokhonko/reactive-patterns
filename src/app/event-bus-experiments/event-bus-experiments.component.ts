import {Component, OnInit} from '@angular/core';
import {testLessons} from '../shared/model/test-lessons';
import {store} from "./app-data";
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

  ngOnInit() {
    store.initializeLessonsList(testLessons.slice(0));

    setTimeout(() => {
      const newLesson: Lesson = {
        id: Math.random(),
        description: 'New lesson arrives from backend'
      };

      store.addLesson(newLesson);
    }, 10000);
  }

  addLesson(lessonText: string) {
    const newLesson: Lesson = {
      id: Math.random(),
      description: lessonText
    };

    store.addLesson(newLesson);
  }
}
