import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import { BASE_URL, USER_DETAIL, LOGIN } from '../../Configures/api'
import request from '../../Utils/request'
import { formatTime, getToken, storeToken } from '../../Utils'

import TabViewItem from '../Subpage/TabViewItem'
import Tip from '../../Others/Tip'

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  static navigationOptions = {
    headerTitle: '个人中心'
  }

  componentDidMount() {
    this.login()
  }

  login(accesstoken = getToken()) {
    console.log('accessToken:', accesstoken)
    if (accesstoken && accesstoken.length) {
      request.post(BASE_URL + LOGIN, {
        accesstoken,
      })
        .catch((error) => {
          console.log('error', error)
        })
        .then((response) => {
          // { success: false, error_msg: "错误的accessToken" }
          // { success: true, loginname: "QQLS", avatar_url: "https://avatars1.githubusercontent.com/u/10087491?v=4&s=120", id: "5a1ce4ba110a338547d6e282" }
          if (response && response.success) {
            // 全局记录, 同时对 accesstoken 进行存储
            storeToken(accesstoken)
            global.storage.save({
              key: 'accesstoken',
              data: accesstoken
            })
            return request.get(BASE_URL + USER_DETAIL(response.loginname))
          }
        })
        .then(response => {
          if (response && response.success) {
            this.setState({
              data: response.data
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  render() {
    const accessToken = getToken()
    if (!accessToken || accessToken.length === 0) {
      return <Tip onLogin={(token) => {
        this.login(token)
      }} />
    }

    const data = this.state.data
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Image style={styles.avatar} source={{ uri: data.avatar_url }} />
          <Text >用户名: {data.loginname}</Text>
          <Text >github: {data.loginname}</Text>
          <View style={styles.extend}>
            <Text>积分: {data.score}</Text>
            <Text>注册于: {formatTime(data.create_at)}</Text>
          </View>
        </View>
        <ScrollableTabView>
          <TabViewItem tabLabel="主题" />
          <TabViewItem tabLabel="回复" />
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  info: {
    alignItems: 'center'
  },
  avatar: {
    margin: 20,
    width: 50,
    height: 50
  },
  extend: {
    flexDirection: 'row'
  }
})