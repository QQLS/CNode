import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'

import { BASE_URL, TOPICS } from '../Configures/api'
import request from '../Utils/request'

export default class TabViewRow extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  _formatTime(replayDate) {
    const now = (new Date()).valueOf()
    const pre = (new Date(replayDate)).valueOf()
    const offset = Math.floor((now - pre) / 1000)
    if (offset < 60) return offset + '秒前'
    else if (offset < 3600) return Math.floor(offset / 60) + '分钟前'
    else if (offset < 3600 * 24) return Math.floor(offset / 3600) + '小时前'
    else if (offset < 3600 * 24 * 30) return Math.floor(offset / (3600 * 24)) + '天前'
    else if (offset < 3600 * 24 * 30 * 12) return Math.floor(offset / (3600 * 24 * 30)) + '个月前'
    else return Math.floor(offset / (3600 * 24 * 30 * 12)) + '年前'
  }

  render() {
    const data = this.props.data
    return (
      <View style={styles.container}>
        <View style={styles.top} >
          <Image source={{ uri: data.author.avatar_url}} style={styles.avatar} />
          <View style={styles.publish}>
            <Text style={styles.publishAuthor}>{data.author.loginname}</Text>
            <Text style={styles.publishTip}>
              发布于:
              <Text style={styles.publishTime}>{this._formatTime(data.create_at)}</Text>
            </Text>
          </View>
        </View>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.bottom}>
          <View style={styles.relate}>
            <View style={styles.count}>
              <Icon size={12} name="ios-paw-outline" color="#aaa" />
              <Text style={styles.countValue}>{data.visit_count}</Text>
            </View>
            <View style={[styles.count, { marginLeft: 8 }]}>
              <Icon size={12} name="ios-bookmarks-outline" color="#aaa" />
              <Text style={styles.countValue}>{data.reply_count}</Text>
            </View>
          </View>
          <Text style={styles.time}>{'最新动态: ' + this._formatTime(data.last_reply_at)}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff'
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 5
  },
  publish: {
    marginLeft: 10
  },
  publishAuthor: {
    fontSize: 15,
    color: '#333'
  },
  publishTip: {
    fontSize: 12,
    color: '#888',
    marginTop: 2
  },
  publishTime: {
    fontSize: 12,
    color: 'red'
  },
  title: {
    fontSize: 14,
    color: '#333',
    marginVertical: 8
  },
  relate: {
    flexDirection: 'row'
  },
  count: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  countValue: {
    color: '#9e78c0',
    fontSize: 10,
    marginLeft: 2
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  time: {
    fontSize: 10,
    color: '#777'
  }
})