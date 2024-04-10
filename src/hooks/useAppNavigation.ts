import {useNavigation} from '@react-navigation/native';

import type {RootStackNavigationProps} from '@navigation/types';

const useAppNavigation = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  return navigation;
};

export default useAppNavigation;
