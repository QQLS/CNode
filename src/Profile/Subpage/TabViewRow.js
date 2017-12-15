import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { formatTime } from '../../Utils'

export default class TabViewRow extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
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
              最新动态: 
              <Text style={styles.publishTime}>{formatTime(data.last_reply_at)}</Text>
            </Text>
          </View>
        </View>
        <Text style={styles.title}>{data.title}</Text>
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
    marginTop: 8
  }
})