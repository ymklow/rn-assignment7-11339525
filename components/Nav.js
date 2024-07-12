import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Menu from './menu';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation(); // Use this if you need the navigation instance

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
        <Image
          source={require("../assets/Menu.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Products')}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </TouchableOpacity>
      
     


      <View style={styles.headerRight}>
        <TouchableOpacity>
          <Image source={require('../assets/Search.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
          <Image source={require('../assets/shoppingBag.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 37,
    backgroundColor: 'white',
    width: '98%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 40,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
});

export default Nav;
