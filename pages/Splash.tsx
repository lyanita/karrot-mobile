import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const SplashScreen = () => {
    return (
        <View>
            <Text>Loading...</Text>
            <ActivityIndicator/>
        </View>
    )
}

export default SplashScreen;