import * as _ from 'lodash';
import {Lesson} from "../shared/model/lesson";
import {BehaviorSubject, Observer, Observable} from 'rxjs';

class DataStore {
  private lessonsListSubject = new BehaviorSubject([]);
  public lessonsList$: Observable<Lesson[]> = this.lessonsListSubject.asObservable();

  private cloneLessons() {
    return _.cloneDeep(this.lessonsListSubject.getValue());
  }

  initializeLessonsList(newList: Lesson[]) {
    this.lessonsListSubject.next(_.cloneDeep(newList));
  }

  addLesson(newLesson: Lesson) {
    const lessons = this.cloneLessons();
    lessons.push(newLesson);

    this.lessonsListSubject.next(lessons);
  }

  deleteLesson(deleted: Lesson) {
    const lessons = this.cloneLessons();
    _.remove(lessons, lesson => lesson.id === deleted.id);

    this.lessonsListSubject.next(lessons);
  }

  toggleLessonView(toggled: Lesson) {
    const lessons = this.cloneLessons();
    const toggledLesson = _.find(lessons, lesson => lesson.id === toggled.id);

    toggledLesson.completed = !toggledLesson.completed;
    this.lessonsListSubject.next(lessons);
  }
}

export const store = new DataStore();

