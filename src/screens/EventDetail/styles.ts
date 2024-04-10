import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    padding: 10,
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventLocation: {
    fontSize: 16,
    padding: 10,
  },
  eventDescription: {
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  favoriteButton: {
    padding: 10,
    color: 'blue',
  },
  addToCalendarButton: {
    padding: 10,
    color: 'green',
  },
});

export default styles;
