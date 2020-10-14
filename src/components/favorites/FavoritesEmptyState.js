import React from 'react';
import { View , Text, StyleSheet } from 'react-native';



const FavoritesEmptyState = () => {
  return(
    <View style={styles.constainer}>
      <Text style={styles.text}>You do not have any favorites yet.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent:'center'
  },
  text:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf:'center'
  }
});

export default FavoritesEmptyState;