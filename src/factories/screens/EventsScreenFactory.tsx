import createEventRepository from '@factories/repositories/EventRepositoryFactory';
import Events from '@screens/Events';
import React from 'react';

const EventsScreenFactory = () => {
  return <Events eventRepository={createEventRepository()} />;
};

export default EventsScreenFactory;
