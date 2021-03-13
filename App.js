import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Provider } from 'react-redux';

import { NativeRouter, Route, Link } from "react-router-native";

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import store from './src/redux/index';

import Home from './src/Screens/Home/index';
import Chapter from './src/Screens/Home/Chapters/index';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? 'black' : 'white',
            }}>
            <Home />
            <NativeRouter>
              <Route path="/chapter/:flag" component={Chapter} />
            </NativeRouter>
          </View>
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({

  highlight: {
    fontWeight: '700',
  },
});

export default App;
