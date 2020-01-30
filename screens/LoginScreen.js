import React, { useState, useEffect } from 'react';
import { Text, Keyboard, StyleSheet, TouchableWithoutFeedback, Image, ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { InputItem, Button } from '@ant-design/react-native';

import { topLevelNavigator } from '../navigation/NavigationService';
import { isSignedIn, signIn, signOut } from '../services/oauth';

const mapStateToProps = state => ({
  initialData: state.initialData
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  button: {
    marginBottom: 5,
    backgroundColor: "#5cc0ee",
    borderColor: "#5cc0ee"
  }
});

const LoginScreen = ({ initialData }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const [errorPass, setErrorPass] = useState();
  const [message, setmessage] = useState();
  const [isLoading, setisLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    const googleData = await signIn();
    console.log('google data: ', googleData)
    topLevelNavigator.navigate('MainTab');
  }

  const handleLogIn = async () => {

  }

  const handleRegisterUser = async () => {
    await signOut();
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
            <Image
              style={{ width: 288, height: 36 }}
              source={require('../assets/logos/logo-premiate.png')}
            />
          </View>
          <InputItem
            clear
            type="email"
            error={errorEmail}
            style={{ marginBottom: 15 }}
            placeholder="Email"
            onChangeText={(el) => { setEmail(el); setErrorEmail(false) }}
          />
          <InputItem
            clear
            type="password"
            error={errorPass}
            style={{ marginBottom: 15 }}
            placeholder="Contraseña"
            secureTextEntry={true}
            password={true}
            onChangeText={(el) => { setPassword(el); setErrorPass(false) }}
          />
          <Button type="primary" style={styles.button} onPress={handleLogIn}>Entrar</Button>
          <Button type="primary" style={styles.button} onPress={handleRegisterUser}>Registrarse</Button>
          <ActivityIndicator size="large" color="#5cc0ee" animating={isLoading} />
          <Text style={{ marginTop: 5, textAlign: "center", color: 'grey' }}>{message}</Text>
          <Button style={{ height: 60 }} onPress={handleGoogleSignIn}>
            <Image
              style={{ width: 17, height: 17, marginRight: 25 }}
              source={require('../assets/logos/google.png')}
            />
            <Text style={{ marginLeft: 25 }}>Entrar desde Google</Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default connect(mapStateToProps)(LoginScreen);
