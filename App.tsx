import React, { useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {ThemeProvider} from 'react-native-elements';
import { Provider, connect } from "react-redux";
import { createStore } from 'redux';

import Navigation from "./components/NavigationBar";
import storeContext from './components/redux/store';

const store = createStore(storeContext);

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
