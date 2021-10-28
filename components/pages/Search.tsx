import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList, TextInput, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
    const [search, setSearch] = React.useState('');
    return (
        <SafeAreaView>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput placeholder="Search to Add Items" 
                value={search}
                onChangeText={setSearch}
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}>
            </TextInput>
            <Button title="ADD" onPress={() => console.log('Add Grocery Item')} />
            <Text>Search for items to add</Text>
            <Text>Tap on the search bar to look for ingredients</Text>
            </View>
        </SafeAreaView>
    )
}

export default SearchScreen;