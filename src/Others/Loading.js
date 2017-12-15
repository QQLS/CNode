import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

export default class Loading extends Component {
  static defaultProps = {
    animating: true
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.indicatorView}>
          <ActivityIndicator
            color="red"
            size="large"
            animating={this.props.animating}
          />
          <Text style={styles.loadText}>加载中...</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorView: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(188, 188, 188, 0.8)',
    borderRadius: 5,
  },
  loadText: {
    marginTop: 20,
  }
})













