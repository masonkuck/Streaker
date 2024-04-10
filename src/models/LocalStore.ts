import { Activity } from './Activity';
import { Day } from './Day';

export type LocalStore = {
    records?: Day[];
    activities?: Activity[];
};
