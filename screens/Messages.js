import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native'
import { Block, Text } from '../components/index'

export default class Messages extends Component {
  static navigationOptions = {
    title: 'Mensajes'
  }
  
  render() {
    return (
      <Block center middle >
        <Text> Messages </Text>
      </Block>
    )
  }
}

const styles = StyleSheet.create({})
