import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useMemo} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {Button, ThemeProvider} from 'react-native-elements';
import { Provider, connect } from "react-redux";
import { createStore } from 'redux';

import Navigation from "./components/NavigationBar";
import userApp from './components/redux/authenticate';

const store = createStore(userApp);

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  )
}

export default App;
