import React from 'react';
import { StyleSheet, View } from 'react-native';

function Inline(props){
  return (
  <View style={styles.container}>
      {props.children}
  </View>
  );
}
export default Inline

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1.25,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
});
