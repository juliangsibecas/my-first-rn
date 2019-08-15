import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Image, Text } from 'react-native'
import { Input } from '../components/index'
import { LinearGradient } from 'expo-linear-gradient'

import ApiService from '../services/ApiService'
import { theme } from '../constants'

import SearchIconActive from '../assets/icons/search--active.png'
import { FlatList } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default class Meet extends Component {
  static navigationOptions = {
    title: 'Conocé'
  }

  state = {
    searchString: null,
    searchFocus: null,
    isEditing: false,
    users: []
  }
  
  async componentDidMount() {
    const users = await ApiService.meet()
    this.setState({users})
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Buscá amigxs..."
          placeholderTextColor={theme.colors.white}
          style={styles.searchInput}
          onFocus={() => this.handleSearchFocus(true)}
          onBlur={() => this.handleSearchFocus(false)}
          onChangeText={text => this.setState({ searchString: text })}
          value={this.state.searchString}
          onRightPress={() => isEditing ? this.setState({ searchString: null }) : null}
          rightStyle={styles.searchRight}
          rightLabel={
            <Image
              source={SearchIconActive}
              style={styles.searchIcon}
            />
          }
        />
        <LinearGradient
            colors={[theme.colors.primary, 'rgba(38, 2, 69, 0)', 'rgba(38, 2, 69, 0)', theme.colors.primary]}
            locations={[0, 0.25, 0.8, 1]}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '100%',
              zIndex: -1,
            }}
            pointerEvents='none'
          />
        <View style={{flex: 1, zIndex: -2}}>
          <FlatList
            data={this.state.users}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
              <View style={styles.item}>
                <Image 
                  source={{uri: item.profilePic}}
                  style={styles.image}
                />
                <View style={styles.info}>
                  <Text style={styles.username}>{item.username}</Text>
                  <Text style={styles.details}>{item.age} | {item.bio}</Text>
                </View>
              </View>
            } 
            keyExtractor={item => item.username}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.sizes.base * 2
  },
  searchInput: {
    color: theme.colors.white,
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2.7,
    backgroundColor: theme.colors.secondary,
    borderRadius: 25,
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5,
    fontFamily: 'CircularStd-Book',
    zIndex: 550,
    marginBottom: theme.sizes.base
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: 'transparent'
  },
  searchIcon: {
    position: 'absolute',
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6,
  },
  item: {
    marginBottom: theme.sizes.base * 2
  },
  image: {
    position: 'relative',
    height: theme.sizes.base * 20,
    borderRadius: 25
  },
  info: {
    position: 'absolute',
    top: theme.sizes.base * 15.2,
    backgroundColor: theme.colors.secondary,
    borderRadius: 25,
    height: theme.sizes.base * 4.8,
    width: width - theme.sizes.base * 4,
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.base
  },
  username: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 18,
    color: theme.colors.white
  },
  details: {
    fontFamily: 'CircularStd-Book',
    fontSize: 16,
    color: theme.colors.tertiary
  }
})
