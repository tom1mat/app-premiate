import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

import Sorteo from '../components/Sorteo';

const mapStatetoProps = state => ({
  sorteos: state.sorteos,
  userData: state.userData,
});

const SorteosScreen = ({ sorteos, userData }) => {
  if (!sorteos) return <Text>No se pudieron cargar los sorteos</Text>;
  return (
    <ScrollView style={styles.container}>
      {sorteos.map(sorteo => <Sorteo sorteo={sorteo} key={sorteo._id}/>)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  card: {
    marginLeft: 35,
    marginRight: 35,
  },
  image: {
    width: 300,
    height: 300
  }
});

export default connect(mapStatetoProps)(SorteosScreen)
