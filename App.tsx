/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
 SafeAreaView, Text, StyleSheet, 
 View
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import StackNavigation from './navigation/StackNavigation';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): React.JSX.Element {
 


  return (
<StackNavigation/>
  );
}

const styles = StyleSheet.create({
 
});

export default App;
