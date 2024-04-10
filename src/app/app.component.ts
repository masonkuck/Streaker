import { Component, OnInit } from '@angular/core';
import { LocalStore } from '../models/LocalStore';
import { Activity } from '../models/Activity';
import { Day } from 'src/models/Day';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private readonly localStoreKey = 'localStore';
  title = 'Streaker';

  get currentStreak(): number {
    // Count the number of days in a row that the user has completed all activities

    if (!this.data.records) return 0;

    let streak = 0;
    this.data.records.forEach(record => {
      if (!record?.activityIds) return;

      if (record.activityIds?.length > 0) {
        streak++;
      }
      else {
        return;
      }
    })
    return streak;
  }

  data: LocalStore = {};

  ngOnInit(): void {
    const string = localStorage.getItem(this.localStoreKey);
    this.data = string ? JSON.parse(string) : {};
    this.saveData();
  }

  saveData(): void {
    localStorage.setItem(this.localStoreKey, JSON.stringify(this.data));
  }

  addActivity(activity: Activity): void {
    if (!activity) return;

    if (!this.data.activities) {
      this.data.activities = [];
    }

    if (this.data.activities.find(a => a.name === activity.name)) {
      alert('Activity already exists');
      return;
    }

    this.data.activities.push(activity);
    this.saveData();
  }

  addDay(day: Day): void {
    if (!day) return;

    if (!this.data.records) {
      this.data.records = []
    }

    const existingDay = this.data.records.find(a => new Date(a.date).toDateString() === day.date.toDateString());
    if (!!existingDay) {
      existingDay.activityIds?.push(...day.activityIds || []);
      existingDay.activityIds = Array.from(new Set(existingDay.activityIds));
    }
    else {
      this.data.records.push(day);
    }

    this.saveData();
  }
}

