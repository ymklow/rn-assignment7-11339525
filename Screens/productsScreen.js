import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../components/menu';
import Header from '../components/Nav';
import Nav from '../components/Nav';

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      let cart = storedCart ? JSON.parse(storedCart) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      console.log('Added to cart:', product);
      Alert.alert('Success', 'Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'Could not add product to cart');
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  return (
    <SafeAreaView style={styles.container}>
     <Nav />

      <View style={styles.ourStory}>
        <Text style={styles.ourStoryText}>OUR STORY</Text>
        <View style={styles.filterIcons}>
          <TouchableOpacity>
            <View style={styles.filterButton}>
              <Image source={require('../assets/Listview.png')} style={styles.filterIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.filterButton}>
              <Image source={require('../assets/Filter.png')} style={styles.filterIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productListContent}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Productdetail', { productId: item.id })}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
                <Image source={require("../assets/add_circle.png")} style={styles.addToCartIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productType}>{truncateText(item.description, 40)}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
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
    position: 'relative',
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
  ourStory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ourStoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterIcons: {
    flexDirection: 'row',
  },
  filterButton: { 
    width: 44, 
    height: 44,
    borderRadius: 22, 
    backgroundColor: '#f9f9f9', 
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  filterIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
 productListContent: {
    paddingHorizontal: 1,
    paddingTop: 3,
  },
  productContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '90%' ,
    height: 240,
    resizeMode: 'contain',
  },
  productDetails: {
    padding: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productType: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dd8560',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    borderRadius: 50,
    shadowRadius: 5,
    elevation: 2,
  },
  addToCartIcon: {
    width: 24,
    height: 24,
  },
})

export default ProductsScreen;
