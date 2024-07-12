import {
	StyleSheet,
	SafeAreaView,
	Image,
	Text,
	View,
	TouchableOpacity,
	ScrollView
  } from "react-native";
  import React, { useState, useEffect } from 'react';
  import Menu from "../components/menu";
  import { AntDesign } from "@expo/vector-icons";
  import { FontAwesome } from "@expo/vector-icons";
  import AsyncStorage from "@react-native-async-storage/async-storage";

  const Productdetail = ({ route, navigation }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { productId } = route.params;
	const [product, setProduct] = useState(null);
  
	useEffect(() => {
	  fetchProduct();
	}, []);
  
	const fetchProduct = async () => {
	  try {
		const response = await fetch(
		  `https://fakestoreapi.com/products/${productId}`
		);
		const data = await response.json();
		setProduct(data);
	  } catch (error) {
		console.error("Error fetching product:", error);
	  }
	};
  
	const handleAddToCart = async () => {
	  try {
		const storedCart = await AsyncStorage.getItem("cart");
		let cart = storedCart ? JSON.parse(storedCart) : [];
  
		const existingProductIndex = cart.findIndex(
		  (item) => item.id === product.id
		);
  
		if (existingProductIndex !== -1) {
		  cart[existingProductIndex].quantity += 1;
		} else {
		  cart.push({ ...product, quantity: 1 });
		}
  
		await AsyncStorage.setItem("cart", JSON.stringify(cart));
		console.log("Added to cart:", product);
	  } catch (error) {
		console.error("Error adding to cart:", error);
	  }
	};
  
	if (!product) {
	  return <Text>Loading...</Text>;
	}
  
	return (
	  <SafeAreaView style={styles.container}>
	  <View style={styles.header}>
			  <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			  <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
				<Image
				  source={require("../assets/Menu.png")}
				  style={styles.icon}
				/>
			  </TouchableOpacity>
			  <Image source={require("../assets/Logo.png")} style={styles.logo} />
			  <View style={styles.headerRight}>
				<TouchableOpacity>
				  <Image
					source={require("../assets/Search.png")}
					style={styles.icon}
				  />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("Checkout")}>
				  <Image
					source={require("../assets/shoppingBag.png")}
					style={styles.icon}
				  />
				</TouchableOpacity>
			  </View>
			</View>
		<ScrollView style={styles.scrollView}>
		  <View style={{ padding: 15 }}>
			
			<Image source={{ uri: product.image }} style={styles.productImage} />
			<View style={styles.productDetails}>
			  <View style={styles.productInline}>
			  <Text style={styles.productName}>{product.title}</Text>
				<AntDesign name="upload" size={24} color="black" />
			  </View>
			  <Text style={styles.productType}>{product.description}</Text>
			  <Text style={styles.productPrice}>$ {product.price}</Text>
			  <View style={styles.productDetailsContainer}>
				<Text style={styles.materialText}>MATERIALS</Text>
				<Text style={styles.materialDescription}>
				  We work with monitoring programmes to ensure compliance with
				  safety, health and quality standards for our products.
				</Text>
  
				<View style={styles.careInstruction}>
				  <Image
					source={require("../assets/Do Not Bleach.png")}
					style={styles.icon}
				  />
				  <Text style={styles.careText}>Do not use bleach</Text>
				</View>
				<View style={styles.careInstruction}>
				  <Image
					source={require("../assets/Do Not Tumble Dry.png")}
					style={styles.icon}
				  />
				  <Text style={styles.careText}>Do not tumble dry</Text>
				</View>
				<View style={styles.careInstruction}>
				  <Image
					source={require("../assets/Do Not Wash.png")}
					style={styles.icon}
				  />
				  <Text style={styles.careText}>
					Dry clean with tetrachloroethylene
				  </Text>
				</View>
				<View style={styles.careInstruction}>
				  <Image
					source={require("../assets/Iron Low Temperature.png")}
					style={styles.icon}
				  />
  
				  <Text style={styles.careText}>
					Iron at a maximum of 110ºC/230ºF
				  </Text>
				</View>
  
				<View style={styles.line} />
  
				<View>
				  <View style={{ flexDirection: "row" }}>
					<Image
					  source={require("../assets/Shipping.png")}
					  style={styles.icon}
					/>
					<Text style={styles.shippingText}>
					  Free Flat Rate Shipping
					</Text>
					<Image
					  source={require("../assets/Up.png")}
					  style={{ marginLeft: "auto" }}
					/>
				  </View>
				  <Text style={styles.shippingDetails}>
					Estimated to be delivered on
				  </Text>
				  <Text style={styles.shippingDetails}>
					09/11/2021 - 12/11/2021.
				  </Text>
				</View>
			  </View>
			</View>
		  </View>
		</ScrollView>
		  <View style={styles.AddToBasket}>
		<TouchableOpacity  onPress={handleAddToCart}>
		  <AntDesign name="plus" size={24} color="white" />
		  </TouchableOpacity>
		  <Text style={{ color: "white", marginLeft: 20, color: "#96bdd6" }}>
			Add to basket
		  </Text>
		  <View style={{ marginLeft: "auto", marginRight: 20 }}>
		  <TouchableOpacity>
			<FontAwesome name="heart-o" size={24} color="white" />
		  </TouchableOpacity>
		  </View>
		  </View>
		
	  </SafeAreaView>
	);
  };
  
  export default Productdetail;
  
  const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  paddingTop: 37,
	  backgroundColor: "white",
	  width: "98%",
	  alignContent: "center",
	  alignSelf: "center",
	},
	scrollView: {
	  flex: 1,
	  marginTop: 10,
	},
	header: {
	  flexDirection: "row",
	  alignItems: "center",
	  justifyContent: "space-between",
	  marginBottom: 20,
	},
	headerRight: {
	  flexDirection: "row",
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
	productInline: {
	  flexDirection: "row",
	  justifyContent: "space-between",
	},
	productImage: {
	  width: "100%",
	  height: 400,
	  resizeMode: "contain",
	},
	productName: {
	  fontSize: 23,
	},
	productPrice: {
	  color: "#dd8560",
	  fontSize: 23,
	},
	line: {
	  height: 2,
	  width: "100%",
	},
	productDetails: {
	  padding: 10,
	},
	productDetailsContainer: {
	  marginTop: 15,
	},
	materialText: {
	  fontSize: 14,
	  fontWeight: "bold",
	  marginBottom: 5,
	},
	materialDescription: {
	  fontSize: 17,
	  marginBottom: 15,
	},
	careInstruction: {
	  flexDirection: "row",
	  alignItems: "center",
	  marginBottom: 5,
	},
	careIcon: {
	  marginRight: 8,
	},
	careText: {
	  fontSize: 12,
	},
	line: {
	  borderBottomWidth: 1,
	  borderBottomColor: "#ddd",
	  marginVertical: 15,
	},
	shippingText: {
	  fontSize: 14,
	  fontWeight: "bold",
	  marginBottom: 5,
	},
	shippingDetails: {
	  fontSize: 12,
	  marginLeft: 45,
	},
	AddToBasket: {
	  flexDirection: "row",
	  backgroundColor: "black",
	  padding: 20,
	},
  });
  