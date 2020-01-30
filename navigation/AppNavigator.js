import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { topLevelNavigator } from './NavigationService'

import MainTabNavigator from './MainTabNavigator';
import LoginTabNavigator from './LoginTabNavigator';

export default ({ initialRouteName }) => {
  const SwitchNavigator = createSwitchNavigator({
    Login: LoginTabNavigator,
    MainTab: MainTabNavigator,
  }, { initialRouteName });

  const AppContainer = createAppContainer(SwitchNavigator);

  return <AppContainer ref={ref => topLevelNavigator.setNavigatorRef(ref)} />
}