import React from 'react';
import { StyleSheet, View} from 'react-native';

import Button from './Button';
import Inline from './Inline';

class Outline extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
        <View style={styles.container}>
            <Inline>
              <Button buttonText={'Buy me'} />
            </Inline>
            <Inline>
              <Button buttonText={'Buy me'} />
            </Inline>
            <Inline>
              <Button buttonText={'Buy me'} />
            </Inline>

        </View>
        );
    }
}

export default Outline

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    margin: 5,
    marginBottom: null,
  },
});
