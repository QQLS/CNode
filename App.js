/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { View, AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'

import Router from './src/Configures/router'

const storage = new Storage({
  storageBackend: AsyncStorage, // 使用 RN 的
  defaultExpires: null // 永不过期
})
global.storage = storage // 设置一个全局的存储变量

export default class App extends React.Component {
  
  render() {
    return <View style={{flex: 1}}><Router /></View>
  }
}