import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Nav from '../components/Nav'

const LocationsScreen = () => {
  return (
	<View style={styles.container}>
		<Nav />
	  <Text style={styles.text}>Locations Screen</Text>
	</View>
  )
}

export default LocationsScreen

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