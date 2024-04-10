import {NativeModules} from 'react-native';

const {CalendarManager} = NativeModules;

interface CalendarManagerModule {
  addEvent(
    name: string,
    location: string,
    startDate: string,
    endDate: string,
  ): Promise<string>;
}

export default CalendarManager as CalendarManagerModule;
