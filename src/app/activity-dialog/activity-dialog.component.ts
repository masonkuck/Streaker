import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Activity } from '../../models/Activity';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.scss']
})
export class ActivityDialogComponent {
  protected name: string = '';
  protected description: string = '';

  @Output() createActivity = new EventEmitter<Activity>();

  save() {
    const id = Guid.newGuid().toString();
    const activity = { id: id, name: this.name, description: this.description }
    if (!activity.name) {
      alert('Please enter a name');
      return;
    }
    this.createActivity.emit(activity);

    this.name = '';
    this.description = '';
  }
}
