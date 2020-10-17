import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import config from '../config';
import { Card, Toast } from '@ant-design/react-native';

const { API_URL } = config;

const mapStatetoProps = state => ({
  userData: state.userData,
});

const parseStringToTime = (dateString) => {
  const subastaDate = new Date(dateString)
  const secondsDiff = subastaDate.getTime() / 1000 - Date.now() / 1000;

  let seconds, minutes, hours, days = 0;
  if (secondsDiff > 0) {
    console.log('aca!!!!!');
    const daysDecimal = secondsDiff / 60 / 60 / 24;
    days = Math.trunc(daysDecimal);

    const hoursDecimal = (daysDecimal - days) * 24;
    hours = Math.trunc(hoursDecimal);

    const minutesDecimal = (hoursDecimal - hours) * 60;
    minutes = Math.trunc(minutesDecimal);

    const secondsDecimal = (minutesDecimal - minutes) * 60;
    seconds = Math.trunc(secondsDecimal);
  }

  return {
    seconds, minutes, hours, days,
  }
}

const Subasta = ({ subasta, userData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localAmount, setLocalAmount] = useState(0);
  const [amount, setAmount] = useState(subasta.amount);
  const [timeRemaining, setTimeRemaining] = useState(parseStringToTime(subasta.dateString));
  const [creditsUsed, setCreditsUsed] = useState(userData.creditsUsed || 0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const handleTime = () => {
    setTimeRemaining({ ...timeRemaining, seconds: timeRemaining.seconds - 1 });
    let { seconds, minutes, hours, days } = timeRemaining;

    if (seconds === 0) {
      if (minutes === 0) {
        if (hours === 0) {
          if (days === 0) {
            setTimeRemaining({ seconds: 0, minutes: 0, hours: 0, days: 0 });
            clearInterval(interval);
          } else {
            setTimeRemaining({
              days: timeRemaining.days - 1,
              hours: 23,
              minutes: 59,
              seconds: 59,
            });
          }
        } else {
          setTimeRemaining({
            hours: timeRemaining.hours - 1,
            minutes: 59,
            seconds: 59,
          });
        }
      } else {
        setTimeRemaining({
          minutes: timeRemaining.minutes - 1,
          seconds: 59,
        });
      }
    }
  }

  React.useEffect(() => {
    // const interval = setInterval(handleTime, 1000);
    const socket = io(API_URL);

    socket.on('connect', () => {
      socket.on(`raise-${subasta._id}`, function (_amount, email, name) {
        if (email !== userData.email) {
          Toast.info(`${name || 'Un usuario '} aumentó el importe a ${_amount}`);
        }

        setAmount(_amount);
      });
    });
  });

  const handleRaise = async () => {
    // creditsUsed: Los credits que el usuario aposto, pero que todavia no gano porque no termino la apuesta.
    // localAmount: los credits que el usuario apuesta por cada apuesta.
    // amount: los credits de la subasta.
    // userCredits: Los credits que tiene el usuario en su cuenta.
    if (localAmount === 0 || isNaN(localAmount)) {
      return Toast.info('Debes ingresar un importe mayor!');
    }

    const userCredits = Number.parseInt(userData.credits);
    const creditsSum = Number.parseInt(creditsUsed) + Number.parseInt(localAmount);

    if (creditsSum > userCredits) {
      const diff = creditsSum - userCredits;
      return Toast.info(`No tienes credits suficientes! Te faltan ${diff}`);
    }

    // setButtonDisabled(true);

    const subastaData = {
      jwtToken: userData.jwtToken,
      id: subasta._id,
      email: userData.email,
      name: userData.name,
      userAmount: Number.parseInt(localAmount),
    };

    const body = JSON.stringify(subastaData);
    console.log(body)
    try {
      const response = await fetch(`${API_URL}raiseSubasta`, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.status);
      if (response.status === 200) {
        const data = await response.json();
        setCreditsUsed(data.creditsUsed);
        Toast.info('Has podido aumentar exitosamente!');
      } else {
        Toast.info('Error, no has podido aumentar');
      }
    } catch (error) {
      console.log(error);
      Toast.info('Error, no has podido aumentar');
    }

    setButtonDisabled(false);
  }

  const { seconds, minutes, hours, days } = timeRemaining;

  return (
    <Card style={styles.card}>
      <Card.Body>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: 'https://d26lpennugtm8s.cloudfront.net/stores/105/049/products/parlante-portatil-panacom-2500w-sp30601-f7468dded3d4e9a75415126339587614-1024-1024.jpg',
            }}
          />
          <Text>{seconds} segundos</Text>
          <Text>{minutes} minutos</Text>
          <Text>{hours} horas</Text>
          <Text>{days} días</Text>
          <Text>{amount}</Text>
          <TextInput onChangeText={_amount => setLocalAmount(_amount)} defaultValue={1}/>
          <Button disabled={buttonDisabled} onPress={handleRaise} title="Subir apuesta" />
        </View>
      </Card.Body>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 35,
    marginRight: 35,
  },
  image: {
    width: 300,
    height: 300
  }
});

export default connect(mapStatetoProps)(Subasta);
