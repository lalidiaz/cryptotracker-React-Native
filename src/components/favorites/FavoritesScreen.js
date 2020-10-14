import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CoinsItem from 'cryptoTracker/src/components/coins/CoinsItem';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from 'cryptoTracker/src/res/colors';
import Storage from 'cryptoTracker/src/libs/storage';


class FavoritesScreen extends Component{

  state = {
    favorites: []
  }



  getFavorites = async () => {
    try{
      const allKeys = await Storage.instance.getAllKeys();

      const keys = allKeys.filter((key) => key.includes('favorite-'));

      const favs = await Storage.instance.multiGet(keys);

      const favorites = favs.map((fav) => JSON.parse(fav[1]) );

      console.log(favorites, 'favs')

      this.setState({ favorites });

    }catch (err){
      console.log('error getFavorites', err)
    }
  }

  handlePress = (coin) => {
    this.props.navigation.navigate("CoinDetail", { coin });
  }


  componentDidMount() {
    this.props.navigation.addListener("focus", this.getFavorites);

  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.getFavorites);
  }

  render(){

    const { favorites } = this.state; 


    return(
      <View style={styles.container}>

        {
          favorites.length == 0 ?
          <FavoritesEmptyState />
          : null
        }

        { favorites.length > 0 ?
          <FlatList 
            data={favorites}
            renderItem={({ item }) => 
            <CoinsItem 
              item={item} 
              onPress={() => this.handlePress(item)} /> 
              }
          />
          : null
        }

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.charade,
    flex:1 
  }
})

export default FavoritesScreen;