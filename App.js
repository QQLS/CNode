/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { View, AsyncStorage, NativeModules } from 'react-native'
import Storage from 'react-native-storage'

import Router from './src/Configures/router'
import { storeToken } from './src/Utils'

const storage = new Storage({
  storageBackend: AsyncStorage, // 使用 RN 的
  defaultExpires: null // 永不过期
})
global.storage = storage // 设置一个全局的存储变量

export default class App extends React.Component {

  componentDidMount() {
    storage.load({
      key: 'accesstoken'
    }).then(response => {
      storeToken(response)
      NativeModules.SplashScreen.hide()
    }).catch(error => {
      storeToken(null)
      NativeModules.SplashScreen.hide()
    })
  }
  
  render() {
    return <View style={{flex: 1}}><Router /></View>
  }
}