import React, {useEffect} from 'react';
import {
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import styles from './styles';
import EventRepository from '@repositories/EventRepository';
import {Event} from '@entities/Event';
import useAppNavigation from '@hooks/useAppNavigation';
import useEventStore from '@hooks/useEventStore';
import useEventsQuery from '@hooks/useEventsQuery';

type Props = {
  eventRepository: EventRepository;
};

const Events: React.FC<Props> = ({eventRepository}) => {
  const navigation = useAppNavigation();

  const {loadEventIds, eventIds} = useEventStore();
  const {events, loadMoreItems} = useEventsQuery({
    eventRepository,
  });

  useEffect(() => {
    loadEventIds();
  }, [loadEventIds]);

  const renderEvent = ({item}: {item: Event}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('eventDetail', {id: item.id})}
      style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Image style={styles.eventImage} source={{uri: item.image_url}} />
      {eventIds.includes(item.id) && (
        <View style={styles.favoriteBadge}>
          <Text style={styles.favoriteText}>Favorite </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      data={events}
      renderItem={renderEvent}
      keyExtractor={item => item.id.toString()}
      onEndReached={loadMoreItems}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={<Text style={styles.title}>Events</Text>}
      ListEmptyComponent={<ActivityIndicator />}
    />
  );
};

export default Events;
