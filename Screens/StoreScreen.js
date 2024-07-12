import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Nav'
import Nav from '../components/Nav'

const Store = () => {
  return (
	<View style={styles.container}>
		<Nav />
	  <Text style={styles.text}>Store</Text>
	</View>
  )
}

export default Store

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
		fontSize: 50,
  },
	text: {
		fontSize: 50,
		textAlign: 'center'
	}
})