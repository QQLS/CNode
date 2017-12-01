import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import { BASE_URL, USER_DETAIL } from '../Configures/api'
import request from '../Utils/request'
import { formatTime } from '../Utils'

import TabViewItem from './TabViewItem'

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
    global.storage.load({
      key: 'userName'
    })
    .then(response => {
      console.log('正确', response)
    })
    .catch(error => {
      console.log('错误', error)
    })
    request.get(BASE_URL + USER_DETAIL('qqls'))
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

  render() {
    const data = this.state.data
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Image style={styles.avatar} source={{uri: data.avatar_url}} />
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