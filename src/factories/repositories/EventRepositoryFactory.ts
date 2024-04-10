import {Event, ApiResponse} from '@entities/Event';
import CalendarManager from '@nativeModules/CalendarManager';
import EventRepository, {PaginationParams} from '@repositories/EventRepository';

function combineDateAndTime(startDate: string, startTime: string): string {
  const datePart = startDate.split('T')[0];
  const timezone = startDate.substring(startDate.lastIndexOf('-'));
  const combinedDateTimeString = `${datePart}T${startTime}:00${timezone}`;
  return combinedDateTimeString;
}

class EventRepositoryImpl implements EventRepository {
  private baseUrl = 'https://api.artic.edu/api/v1/events';

  async getEvents(params: PaginationParams): Promise<ApiResponse> {
    const {page, limit} = params;
    const url = `${this.baseUrl}?page=${page}&limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = (await response.json()) as ApiResponse;

    return data;
  }

  async getEventById(id: number): Promise<Event> {
    const url = `${this.baseUrl}/${id}`;
    const response = await fetch(url);
    console.log('response', response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  }

  async addEventToCalendar(event: Event): Promise<void> {
    const startTime = combineDateAndTime(event.start_date, event.start_time);
    const endTime = combineDateAndTime(event.end_date, event.end_time);
    await CalendarManager.addEvent(
      event.title,
      event.location,
      startTime,
      endTime,
    );
  }
}

const createEventRepository = () => {
  return new EventRepositoryImpl();
};

export default createEventRepository;
