import * as _ from 'lodash';
import {Lesson} from "../shared/model/lesson";

export interface Observer {
  next(data: any);
}

export interface Observable {
  subscribe(obs: Observer);
  unsubscribe(obs: Observer);
}

interface Subject extends Observer, Observable {}

class SubjectImplementation implements Subject {
  private observers: Observer[] = [];

  next(data: any) {
    this.observers.forEach(obs => obs.next(data));
  }

  subscribe(obs: Observer) {
    this.observers.push(obs);
  }

  unsubscribe(obs: Observer) {
    _.remove(this.observers, item => item === obs);
  }

}

class DataStore implements Observable {
  private lessons: Lesson[] = [];
  private lessonsListSubject = new SubjectImplementation();

  subscribe(obs: Observer) {
    this.lessonsListSubject.subscribe(obs);
    obs.next(this.lessons);
  }

  unsubscribe(obs: Observer) {
    this.lessonsListSubject.unsubscribe(obs);
  }

  broadcast() {
    this.lessonsListSubject.next(_.cloneDeep(this.lessons));
  }

  initializeLessonsList(newList: Lesson[]) {
    this.lessons = _.cloneDeep(newList);
    this.broadcast();
  }

  addLesson(newLesson: Lesson) {
    this.lessons.push(_.cloneDeep(newLesson));
    this.broadcast();
  }

  deleteLesson(deleted: Lesson) {
    _.remove(this.lessons, lesson => lesson.id === deleted.id);
    this.broadcast();
  }

  toggleLessonView(toggled: Lesson) {
    const toggledLesson = _.find(this.lessons, lesson => lesson.id === toggled.id);
    toggledLesson.completed = !toggledLesson.completed;
    this.broadcast();
  }
}

export const store = new DataStore();

// This is the event bus implementation
// export const LESSONS_LIST_AVAILABLE = 'NEW_LIST_AVAILABLE';
// export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';
// export interface Observer {
//   notify(data: any);
// }
//
// interface Subject {
//   registerObserver(eventType: string, obs: Observer);
//   unregisterObserver(eventType: string, obs: Observer);
//   notifyObservers(eventType: string, data: any);
// }
//
// class EventBus implements Subject {
//   private observers: {[key: string]: Observer[]} = {};
//
//   private observersPerEventType(eventType: string): Observer[] {
//     if (!this.observers[eventType]) {
//       this.observers[eventType] = [];
//     }
//
//     return this.observers[eventType];
//   }
//
//   registerObserver(eventType: string, obs: Observer) {
//     this.observersPerEventType(eventType).push(obs);
//   }
//
//   unregisterObserver(eventType: string, obs: Observer) {
//     _.remove(this.observersPerEventType(eventType), item => item === obs);
//   }
//
//   notifyObservers(eventType: string, data: any) {
//     this.observersPerEventType(eventType).forEach(obs => obs.notify(data));
//   }
// }
//
// export const GlobalEventBus = new EventBus();
