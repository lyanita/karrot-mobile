import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useMemo} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {Button, ThemeProvider} from 'react-native-elements';

import Navigation from "./components/NavigationBar";
import Authentication from "./components/Authentication";

function App() {
  const [user, setUser] = useState(1);
  const value = useMemo(()=> ({
    user, setUser
  }), [user, setUser]);

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  )
}

export default App;
