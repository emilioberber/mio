import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import SplashScreen from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import QRScreen from './screens/QRScanner';
import OrderScreen from './screens/OrderScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="QRScanner" component={QRScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: false }}/>

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}