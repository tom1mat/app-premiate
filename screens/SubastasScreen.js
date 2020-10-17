import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

import Subasta from '../components/Subasta';

const mapStatetoProps = state => ({
  subastas: state.subastas,
  userData: state.userData,
});

const SubastasScreen = ({ subastas, userData }) => {
  if (!subastas) return <Text>No se pudieron cargar las subastas</Text>;
  return (
    <ScrollView style={styles.container}>
      {subastas.map(subasta => <Subasta subasta={subasta} key={subasta._id}/>)}
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

export default connect(mapStatetoProps)(SubastasScreen)
