import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EvilIcons } from '@expo/vector-icons';

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigation = useNavigation();
  const menuItems = [
    { name: 'Home', screen: 'Products' },
    { name: 'Checkout', screen: 'Checkout' },
    { name: 'Store', screen: 'Store' },
    { name: 'Locations', screen: 'Locations' },
    { name: 'Blog', screen: 'Blog' },
    { name: 'Jewellery', screen: 'Jewellery' },
    { name: 'Electronic', screen: 'Electronic' },
    { name: 'Clothing', screen: 'Clothing' },
   
  ];

  return (
    <View style={[styles.menuContainer, isMenuOpen ? styles.menuOpen : styles.menuClosed]}>
	<TouchableOpacity onPress={() => setIsMenuOpen(false)} style={styles.closeButton}>     
	<EvilIcons name="close" size={30} color="black" style={styles.menuClose} />
	</TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>ERIC ATSU</Text>
        <View style={styles.line} />
      </View>
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => {
          setIsMenuOpen(false); // Close menu after selection
          navigation.navigate(item.screen); // Navigate to the corresponding screen (you'll need to create these screens)
        }}>
          <Text style={styles.menuItem}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '63.5%', // Adjust width as needed
    height: 1000,
    backgroundColor: 'white',
    zIndex: 10, // Ensure menu is above other content
  },
  menuClose: {
	paddingTop: 10,
  },
    menuOpen: {
    transform: [{ translateX: 0 }], // Slide in from left
  },
  menuClosed: {
    transform: [{ translateX: -300 }], // Slide out of view
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  line: {
    height: 1,
    backgroundColor: '#dd8560',
	width: 80,
	marginLeft: 4,
  },
  menuItem: {
    padding: 15,
	fontSize: 20,
  },
});

export default Menu;