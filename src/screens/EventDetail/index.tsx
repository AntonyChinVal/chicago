import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EventRepository from '@repositories/EventRepository';
import {useQuery} from '@tanstack/react-query';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '@navigation/types';
import styles from './styles';
import useEventStore from '@hooks/useEventStore';

type EventDetailRouteProp = RouteProp<StackParamList, 'eventDetail'>;

type Props = {
  eventRepository: EventRepository;
};

const EventDetail: React.FC<Props> = ({eventRepository}) => {
  const {params} = useRoute<EventDetailRouteProp>();
  const {id} = params;
  const {toggleEventId, eventIds} = useEventStore();
  const {
    data: event,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventRepository.getEventById(id),
  });

  const isFavorite = eventIds.includes(id);

  const handleFavorite = () => {
    toggleEventId(id);
  };

  const handleAddToCalendar = async () => {
    if (event) {
      try {
        await eventRepository.addEventToCalendar(event);
        Alert.alert('Success', 'Event added to calendar');
      } catch (_) {
        Alert.alert('Error', 'Could not add event to calendar');
      }
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error instanceof Error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {event ? (
        <ScrollView>
          <Image
            resizeMode="contain"
            style={styles.eventImage}
            source={{uri: event.image_url}}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={handleFavorite}>
              <Text style={styles.favoriteButton}>
                {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAddToCalendar}>
              <Text style={styles.addToCalendarButton}>Add to calendar</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{event.title}</Text>
          {event.date_display && (
            <Text style={styles.eventLocation}>Date: {event.date_display}</Text>
          )}
          <Text style={styles.eventLocation}>Location: {event.location}</Text>
          <Text style={styles.eventDescription}>{event.short_description}</Text>
        </ScrollView>
      ) : (
        <Text>No event found.</Text>
      )}
    </View>
  );
};

export default EventDetail;
