import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Activity } from 'src/models/Activity';
import { Day } from 'src/models/Day';

@Component({
  selector: 'app-streak-dialog',
  templateUrl: './streak-dialog.component.html',
  styleUrls: ['./streak-dialog.component.scss']
})
export class StreakDialogComponent implements OnInit {
  @Input() activities: Activity[] = [];
  @Output() createDay = new EventEmitter<Day>();

  protected selectableActivities: ActivityWithSelection[] = [];

  ngOnInit() {
    this.selectableActivities = this.activities.map(activity => ({ ...activity, selected: false }));
  }

  save() {
    const ids = this.selectableActivities.filter(activity => activity.selected).map(activity => activity.id ?? '');
    const day: Day = { date: new Date(new Date().toDateString()), activityIds: ids };
    this.createDay.emit(day);

    // reset selection
    this.selectableActivities.forEach(activity => activity.selected = false);

    document.getElementById('closeButton')?.click();
  }
}

type ActivityWithSelection = Activity & { selected: boolean };

