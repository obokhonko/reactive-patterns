import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'browser-event-experiments',
  templateUrl: './browser-event-experiments.component.html',
  styleUrls: ['./browser-event-experiments.component.css']
})
export class BrowserEventExperimentsComponent implements OnInit {
  public hoverSection: HTMLElement;

  ngOnInit() {
    this.hoverSection = document.getElementById('hover');
    this.hoverSection.addEventListener('mousemove', onMouseMove);
  }

  public unsubscribe(): void {
    console.log('Called unsubscribe()');

    this.hoverSection.removeEventListener('mousemove', onMouseMove);
  }
}

function onMouseMove(ev) {
  console.log(ev);
}
