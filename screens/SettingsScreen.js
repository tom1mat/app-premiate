import React from 'react';
import { Button } from '@ant-design/react-native';

import { topLevelNavigator } from '../navigation/NavigationService';
import { signOut } from '../services/oauth';

const handleLogOut = async () => {
  await signOut();
  topLevelNavigator.navigate('Login');
}

export default function SettingsScreen() {
 return <Button onPress={handleLogOut}>Log out</Button>
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
