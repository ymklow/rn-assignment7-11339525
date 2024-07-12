import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'; // Import Alert
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from "../components/menu";
import Nav from '../components/Nav';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substr(0, maxLength) + '...';
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart = cart.filter(item => item.id !== productId);

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      setCartItems(cart);

      Alert.alert('Item Removed', 'The item has been removed from your cart.', [{ text: 'OK' }]);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const renderCartItem = ({ item }) => {
    const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;

    return (
      <View style={styles.cartItem}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.itemDetails}>
          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ color: '#545454' }}>{item.type}</Text>
          <Text style={styles.productType}>{truncateText(item.description, 40)}</Text>
          <Text style={{ color: '#dd8560' }}>${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => handleRemoveFromCart(item.id)}>
          <Image source={require("../assets/remove.png")} style={styles.addToCartIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Nav />
      <Text style={{ fontWeight: 'bold', alignSelf: 'center', fontSize: 20, letterSpacing: 6 }}>CHECKOUT</Text>
      <View style={{ width: 151, alignSelf: 'center', marginLeft: 10 }}>
        <View style={styles.CheckoutLine}>
          <View style={styles.line} />
          <View style={styles.diamond} />
          <View style={styles.line} />
        </View>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>E S T . T O T A L</Text>
        <Text style={[styles.totalPrice, { color: '#e99d7e' }]}>${getTotal()}</Text>
      </View>

      <View style={styles.AddToBasket}>
        <TouchableOpacity>
          <Image source={require("../assets/shoppingBag.png")} style={{ tintColor: 'white', marginLeft: 90 }} />
        </TouchableOpacity>
        <Text style={{ color: "white", marginLeft: 10, fontSize: 22 }}>CHECKOUT</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    color: 'white',
    width: '97%',
    alignContent: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  addToCartButton: {
    alignSelf: 'flex-end',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    color: '#666',
    paddingLeft: 20,
  },
  totalPrice: {
    paddingRight: 30,
    fontSize: 16,
    color: 'black',
  },
  AddToBasket: {
    flexDirection: "row",
    backgroundColor: "black",
    padding: 20,
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
    marginLeft: 140,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  image: {
    width: 120,
    height: 140,
    resizeMode: 'contain',
  },
  CheckoutLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  diamond: {
    width: 12,
    height: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000000',
    transform: [{ rotate: '45deg' }],
  },
});

export default Checkout;
