import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EventsScreenFactory from '@factories/screens/EventsScreenFactory';
import EventDetailScreenFactory from '@factories/screens/EventDetailScreenFactory';
import {StackParamList} from './types';

const Stack = createNativeStackNavigator<StackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="events">
      <Stack.Screen
        options={{
          title: 'Events',
        }}
        name="events"
        component={EventsScreenFactory}
      />
      <Stack.Screen
        options={{
          title: 'Event Detail',
        }}
        name="eventDetail"
        component={EventDetailScreenFactory}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
