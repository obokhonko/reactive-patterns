import {Component, OnInit} from '@angular/core';
import {Lesson} from '../shared/model/lesson';
import {store} from "../event-bus-experiments/app-data";
import {Observer} from 'rxjs';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer<Lesson[]>, OnInit {
  lessons: Lesson[] = [];

  ngOnInit() {
    store.lessonsList$.subscribe(this);
  }

  next(data: Lesson[]) {
    this.lessons.length = 0;
    this.lessons.push(...data);
  }

  complete() {
    console.info('Completed');
  }

  error(err: any) {
    console.error(err);
  }

  toggleLessonViewed(lesson: Lesson) {
    store.toggleLessonView(lesson);
  }

  deleteLesson(deleted: Lesson) {
    store.deleteLesson(deleted);
  }
}

