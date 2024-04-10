import {ApiResponse, Event} from '@entities/Event';

export type PaginationParams = {
  page: number;
  limit: number;
};

interface EventRepository {
  getEvents(params: PaginationParams): Promise<ApiResponse>;
  getEventById(id: number): Promise<Event>;
  addEventToCalendar(event: Event): Promise<void>;
}

export default EventRepository;
