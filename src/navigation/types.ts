import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const StackRoutes = {
  events: 'events',
  eventDetail: 'eventDetail',
};

export type StackParamList = {
  events: undefined;
  eventDetail: {id: number};
};

export type RootStackNavigationProps =
  NativeStackNavigationProp<StackParamList>;
