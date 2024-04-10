import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type EventStore = {
  eventIds: number[];
  toggleEventId: (id: number) => Promise<void>;
  loadEventIds: () => Promise<void>;
};

const useEventStore = create<EventStore>((set, get) => ({
  eventIds: [],
  toggleEventId: async id => {
    const {eventIds} = get();
    let updatedEventIds;

    if (eventIds.includes(id)) {
      updatedEventIds = eventIds.filter(eventId => eventId !== id);
    } else {
      updatedEventIds = [...eventIds, id];
    }

    await AsyncStorage.setItem('eventIds', JSON.stringify(updatedEventIds));
    set({eventIds: updatedEventIds});
  },
  loadEventIds: async () => {
    const eventIdsString = await AsyncStorage.getItem('eventIds');
    const eventIds = eventIdsString ? JSON.parse(eventIdsString) : [];
    set({eventIds});
  },
}));

export default useEventStore;
