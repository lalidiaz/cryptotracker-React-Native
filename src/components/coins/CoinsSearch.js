import React from 'react';
import { TextInput, Platform, View, StyleSheet } from 'react-native';
import Colors from 'cryptoTracker/src/res/colors';


class CoinsSearch extends React.Component{

  state = {
    query: ""
  }

  handleText = (query) => {
    this.setState({ query })

    if( this.props.onChange) {
      this.props.onChange(query);
    }
  }

  render(){
    const { query } = this.state
    return(
      <View>
        <TextInput 
        style={[
        styles.textInput,
        Platform.OS == 'ios' ? 
        styles.textInputIOS 
        : 
        styles.textInputAdroid
         ]}
        onChangeText={this.handleText}
        value={query}
        placeholder="search coin"
        placeholderTextColor="#fff"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput:{
    height:46,
    backgroundColor: Colors.zircon,
    paddingLeft:16,
    color: Colors.white,
    fontSize:18
  },
  textInputAdroid:{
    borderWidth:2,
    borderBottomColor:Colors.zircon
  },
  textInputIOS:{
    margin:8,
    borderRadius:8
  }
})

export default CoinsSearch;