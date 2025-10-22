import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import SplashScreen from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import OrderScreen from './screens/OrderScreen';
import LoginWithEmailScreen from './screens/LoginWithEmailScreen';
import LoginWithPhoneScreen from './screens/LoginWithPhoneScreen';
import SignupScreen from './screens/SignupScreen';
import QRScanner from './screens/QRScanner';
import Wallet from './screens/Wallet';
import AgregarTarjeta from './screens/AgregarTarjeta';
import Perfil from './screens/Perfil';
import Ayuda from './screens/Ayuda';
import Restaurantes from './screens/Restaurantes';
import ConfirmCodeScreen from './screens/ConfirmCodeScreen';
import EditarPerfil from './screens/EditarPerfil';
import Configuraciones from './screens/Configuraciones';
import CambiarContra from './screens/CambiarContra';
import ContraOlvidada from './screens/ContraOlvidada';
import TipScreen from './screens/TipScreen';
import PagarScreen from './screens/PagarScreen';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="QRScanner" component={QRScanner} options={{ headerShown: false }}/>
          <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="LoginWithEmailScreen" component={LoginWithEmailScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="LoginWithPhoneScreen" component={LoginWithPhoneScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }}/>
          <Stack.Screen name="AgregarTarjeta" component={AgregarTarjeta} options={{ headerShown: false }}/>
          <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
          <Stack.Screen name="Ayuda" component={Ayuda} options={{ headerShown: false }}/>
          <Stack.Screen name="Restaurantes" component={Restaurantes} options={{ headerShown: false }}/>
          <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ headerShown: false }}/>
          <Stack.Screen name="Configuraciones" component={Configuraciones} options={{ headerShown: false }}/>
          <Stack.Screen name="CambiarContra" component={CambiarContra} options={{ headerShown: false }}/>
          <Stack.Screen name="ContraOlvidada" component={ContraOlvidada} options={{ headerShown: false }}/>
          <Stack.Screen name="TipScreen" component={TipScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="PagarScreen" component={PagarScreen} options={{ headerShown: false }}/>

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}