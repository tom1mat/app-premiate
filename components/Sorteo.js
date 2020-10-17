import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { connect } from 'react-redux';

import { Card } from '@ant-design/react-native';

import { suscribeToSorteo, unSuscribeToSorteo } from '../services/api';

const mapStatetoProps = state => ({
  userData: state.userData,
});

const Sorteo = ({ sorteo, userData }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuscribed, setIsSuscribed] = React.useState(userData.sorteos[sorteo._id]);

  const handleSuscribe = async () => {
    setIsLoading(true);

    if (isSuscribed) {
      const success = await unSuscribeToSorteo(sorteo._id, userData.jwtToken, userData.email);
      setIsLoading(false);

      if (success) setIsSuscribed(false);
    } else {
      const success = await suscribeToSorteo(sorteo._id, userData.jwtToken, userData.email);
      setIsLoading(false);

      if (success) setIsSuscribed(true);
    }
  }

  let buttonSuscribeText = 'Inscribirse';

  if (isLoading) {
    buttonSuscribeText = 'Loading';
  } else if (isSuscribed) {
    buttonSuscribeText = 'Desinscribirse';
  }

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
          <Text>{sorteo.sorteo}</Text>
          <Button onPress={handleSuscribe} title={buttonSuscribeText} />
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

export default connect(mapStatetoProps)(Sorteo)
