import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Pressable, 
  Image, 
  StyleSheet, 
  SectionList, 
  FlatList,
  Alert
} from 'react-native';
import Colors from 'cryptoTracker/src/res/colors';
import Http from 'cryptoTracker/src/libs/http';
import CoinMarketItem from './CoinMarketItem';
import Storage from 'cryptoTracker/src/libs/storage';



class CoinDetailScreen extends Component{

    state ={
        coin: {},
        markets: [],
        isFavorite: false
    }


    toggleFavorite = () => {
      if(this.state.isFavorite){
        this.removeFavorite();
      } else {
        this.addFavorite();
      }

    }



    addFavorite = async () => {
      const coin = JSON.stringify(this.state.coin);
      const key = `favorite-${this.state.coin.id}`

      const stored = await Storage.instance.store(key, coin);

      console.log('stored', stored)
      
      if(stored){
        this.setState({ isFavorite: true });
      }
    }

    getFavorite = async () => {
      try{
        const key = `favorite-${this.state.coin.id}`

        const favStr = await Storage.instance.get(key);

       if(favStr != null) {
         this.setState({ isFavorite: true });
       }

      }catch (err) {
        console.log('getFavorite error', err)

      }
     
    }

    removeFavorite = async () => {

      Alert.alert("Remove Favorite", "Are you sure?", [
        {
          text: "cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "remove",
          onPress: async () => {
            const key = `favorite-${this.state.coin.id}`

            await Storage.instance.remove(key);
      
            this.setState({ isFavorite : false});
          },
          style:"destructive"

        }
      ])    
    }





    getSymbolIcon = (name) => {

      if(name) {

        const symbol = name.toLowerCase().replace(" ", "-");

        return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
      }
    }
  
    getSections = (coin) => {
      const sections = [
        {
          title: "Market cap",
          data: [coin.market_cap_usd]
        },
        {
          title: "Volume 24h",
          data: [coin.volume24]
        },
        {
          title: "Change 24h",
          data: [coin.percent_change_24h]
        }
      ];

      return sections;
    }

    getMarkets = async (coinId) => {
      const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
      
      const markets = await Http.instance.get(url);
    
      this.setState({ markets });
    }


    componentDidMount(){
       const { coin } = this.props.route.params;

        this.props.navigation.setOptions({ title: coin.name});
        this.getMarkets(coin.id);

       this.setState({ coin }, () => {
         this.getFavorite();
       });
    }

  render(){

    const { coin, markets, isFavorite } = this.state;

    return(
      <View style={styles.container}>
        <View style={styles.subHeader}>

        <View style={styles.row}>
            <Image style={styles.iconImg} source={{uri: this.getSymbolIcon(coin.name) }} />
            <Text style={styles.titleText}>{coin.name}</Text>
        </View>
          <Pressable 
            onPress={this.toggleFavorite}
            style={
              styles.btnFavorite, 
              isFavorite ? 
              styles.btnFavoriteRemove 
              :
              styles.btnFavoriteAdd
          }>

            <Text style={styles.btnFavoriteText}>
              {isFavorite ? "Remove favorite" : "Add favorite"}
              </Text>
          </Pressable>
        </View>

        <SectionList 
        style={styles.section}
        sections={this.getSections(coin)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => 
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
        }
          renderSectionHeader={({ section}) => 
            <View style={styles.sectionHeader}>    
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          } 
        />
        <Text style={styles.marketTitle}>Markets</Text>

        <FlatList 
        style={styles.list}
        horizontal={true}
        data={markets} 
        renderItem={({ item }) => <CoinMarketItem item={item}/> }
        />

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    backgroundColor: Colors.charade,
    flex:1
  },
  row:{
    flexDirection: 'row'
  },
  subHeader:{
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  titleText:{
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 8
  },
  marketTitle:{
    color: Colors.white,
    fontSize:16,
    marginBottom:16,
    marginLeft:16,
    fontWeight:'bold'
  },  
  list:{
    maxHeight:100,
    paddingLeft:16
  },  
  iconImg:{
    width:25,
    height:25
  },
  section:{
    maxHeight:220
  },
  sectionHeader:{
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8
  },
  sectionItem:{
    padding:8,
    color:Colors.white
  },
  itemText:{
    color:Colors.white,
    fontSize:14
  },
  sectionText:{
    color:Colors.white,
    fontSize:14,
    fontWeight:'bold'
  },
  btnFavorite:{
    padding:8,
    borderRadius:10, 
    
  },
  btnFavoriteText:{
    color: Colors.white,
    fontSize:18,
    padding:10
    
  },
  btnFavoriteAdd:{
    backgroundColor: Colors.picton,
    borderRadius:8
  },
  btnFavoriteRemove:{
      backgroundColor: Colors.carmine,
      borderRadius:8
  }

})

export default CoinDetailScreen;
