import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SubastasScreen from '../screens/SubastasScreen';
import SorteosScreen from '../screens/SorteosScreen';
import ProfileScreen from '../screens/ProfileScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

// Home screen
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};
HomeStack.path = '';

// Subastas screen
const SubastasStack = createStackNavigator(
  {
    Subastas: SubastasScreen,
  },
  config
);
SubastasStack.navigationOptions = {
  tabBarLabel: 'Subastas',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};
SubastasStack.path = '';

// Sorteos screen
const SorteosStack = createStackNavigator(
  {
    Sorteos: SorteosScreen,
  },
  config
);
SorteosStack.navigationOptions = {
  tabBarLabel: 'Sorteos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};
SubastasStack.path = '';

// Profile screen
const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);
ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};
ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SorteosScreen,
  SubastasStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
