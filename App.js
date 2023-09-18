import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <>
      <RootNavigator />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
