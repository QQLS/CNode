import React from 'react'
import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import { BASE_URL, USER_DETAIL, LOGIN } from '../../Configures/api'
import request from '../../Utils/request'
import { formatTime, getToken, storeToken, removeToken } from '../../Utils'

import TabViewItem from '../Subpage/TabViewItem'
import Tip from '../../Others/Tip'
import Loading from '../../Others/Loading'

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      animating: true,
    }
  }

  static navigationOptions = {
    headerTitle: '个人中心'
  }

  componentDidMount() {
    this.login()
  }

  login(accesstoken = getToken()) {
    if (accesstoken && accesstoken.length) {
      request.post(BASE_URL + LOGIN, {
        accesstoken,
      })
        .catch((error) => {
          console.log('error', error)
          this.setState({
            animating: false
          })
          Alert.alert('提示', 'token 验证出错', [{
            title: '取消',
            style: 'cancel'
          }])
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
            return request.get(BASE_URL + USER_DETAIL('alsotang'))
          } else {
            this.setState({
              animating: false
            })
            Alert.alert('提示', response.error_msg, [{
              title: '取消',
              style: 'cancel'
            }])            
          }
        })
        .then(response => {
          if (response && response.success) {
            this.setState({
              data: response.data,
              animating: false
            })
          }
        })
        .catch(error => {
          console.log(error)
          this.setState({
            animating: false
          })
          Alert.alert('提示', '个人信息请求失败', [{
            title: '取消',
            style: 'cancel'
          }])
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

    if (this.state.animating) {
      return (
        <Loading animating={this.state.animating} />
      )
    }

    const data = this.state.data
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Image style={styles.backgroundImage} source={{ uri: data.avatar_url }} />
          <Image style={styles.avatar} source={{ uri: data.avatar_url }} />
          <Text style={styles.transparentText}>
            用户名:
            <Text style={styles.name}>{data.loginname}</Text>
          </Text>
          <Text style={styles.transparentText}>
            github:
            <Text style={styles.name}>{data.loginname}</Text>
          </Text>
          <View style={styles.extend}>
            <Text style={[styles.transparentText, {marginRight: 10}]}>
              积分:
              <Text style={styles.otherValue}>{data.score}</Text>
            </Text>
            <Text style={styles.transparentText}>
              注册于: 
              <Text style={styles.otherValue}>{formatTime(data.create_at)}</Text>
            </Text>
          </View>
        </View>
        <ScrollableTabView>
          <TabViewItem tabLabel="主题" datas={data.recent_topics} />
          <TabViewItem tabLabel="回复" datas={data.recent_replies} />
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
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  avatar: {
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  transparentText: {
    backgroundColor: 'transparent'
  },
  name: {
    color: 'red'
  },
  otherValue: {
    color: 'navy'
  },
  extend: {
    flexDirection: 'row'
  }
})