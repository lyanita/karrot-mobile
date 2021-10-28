import React, { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const RecipeScreen = () => {
    return (
        <ScrollView>
        <SafeAreaView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Recipes</Text>
        </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default RecipeScreen;