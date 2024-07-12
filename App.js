import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';


// Screens
import ProductsScreen from "./Screens/productsScreen"
import Checkout from "./Screens/checkoutScreen";
import ElectronicScreen from "./Screens/ElectronicScreen";
import JewelleryScreen from "./Screens/JewelleryScreen";
import LocationsScreen from "./Screens/LocationsScreen";
import ClothingScreen from "./Screens/ClothingScreen";
import BlogScreen from "./Screens/BlogScreen";
import StoreScreen from "./Screens/StoreScreen";
import Productdetail from "./Screens/ProductdetailScreen";


const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <>
      
        <Stack.Screen
          options={{ headerShown: false }}
          name="Products"
          component={ProductsScreen}
          
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Checkout"
          component={Checkout}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Clothing"
          component={ClothingScreen}
          
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Electronic"
          component={ElectronicScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Jewellery"
          component={JewelleryScreen}
          
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Locations"
          component={LocationsScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Blog"
          component={BlogScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Store"
          component={StoreScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Productdetail"
          component={Productdetail}
        />
      </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;