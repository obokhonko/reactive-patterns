import {Component, OnInit} from '@angular/core';
import {Lesson} from '../shared/model/lesson';
import {store, Observer} from "../event-bus-experiments/app-data";

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit, Observer {
  public lessons: Lesson[] = [];

  ngOnInit() {
    store.subscribe(this);
  }

  next(data: Lesson[]) {
    this.lessons = data;
  }

  toggleLessonViewed(lesson: Lesson) {
    store.toggleLessonView(lesson);
  }

  deleteLesson(deleted: Lesson) {
    store.deleteLesson(deleted);
  }

}
