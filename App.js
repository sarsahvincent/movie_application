import {View} from 'react-native';
import React from 'react';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <HomeScreen />
    </View>
  );
};

export default App;
