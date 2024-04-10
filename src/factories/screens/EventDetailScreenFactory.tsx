import createEventRepository from '@factories/repositories/EventRepositoryFactory';
import EventDetail from '@screens/EventDetail';
import React from 'react';

const EventDetailScreenFactory = () => {
  return <EventDetail eventRepository={createEventRepository()} />;
};

export default EventDetailScreenFactory;
