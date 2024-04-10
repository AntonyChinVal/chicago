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
  eventContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  eventTitle: {
    fontSize: 16,
    flex: 1,
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  favoriteText: {
    color: 'white',
  },
  favoriteBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },
});

export default styles;
