import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../components/menu';
import Nav from '../components/Nav';

const BlogScreen = () => {
	return (
	<View style={styles.container}>
		<Nav />
	  <Text style={styles.text}>Blog Screen</Text>
	</View>
  )
}

export default BlogScreen

const styles = StyleSheet.create({
	container: {
    flex: 1,
    padding: 10,
    paddingTop: 37,
    backgroundColor: 'white',
    width: '98%',
    alignContent: 'center',
    alignSelf: 'center',
		marginTop: 20,
  },
	text: {
		fontSize: 50,
		textAlign: 'center'
	}
 
	
})