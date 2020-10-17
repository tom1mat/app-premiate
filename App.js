import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { AsyncStorage, Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Provider as AntDesignProvider } from "@ant-design/react-native"

import esES from '@ant-design/react-native/es/locale-provider/es_ES';

import reducers from "./reducers";
import AppNavigator from './navigation/AppNavigator';
import { getUserData } from './services/api';

let initialData = { };
let initialRouteName = 'Login';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <AntDesignProvider locale={ {value: 'Español', label: 'Español', language: esES}}>
        <Provider store={createStore(reducers, initialData)}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator initialRouteName={initialRouteName}/>
          </View>
        </Provider>
      </AntDesignProvider>
    );
  }
}

async function loadResourcesAsync() {
  const userEmail = await AsyncStorage.getItem('userEmail');
  if (userEmail) {
    initialRouteName = 'MainTab';
  }
  const data = await Promise.all([
    userEmail ? getUserData(userEmail) : Promise.resolve(null),
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
  initialData = data[0] || { };
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
