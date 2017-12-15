import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'

import Login from './Login'

import Icon from 'react-native-vector-icons/Ionicons'

export default class Tip extends React.Component {
  constructor(props) {
    super(props)
    this.state = { modalVisible: false }
  }

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onLogin: () => {}
  }

  setModalVisible(visible) {
    this.setState({ 
      modalVisible: visible 
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <Login
            onHide={() => {
              this.setModalVisible(false)
            }}
            onLogin={this.props.onLogin}
          />
        </Modal>

        <Text style={styles.tip}>您好没有登录, 请先进行</Text>
        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }} underlayColor="gray">
          <Text style={styles.login}>登录</Text>
        </TouchableHighlight>
        <Text style={styles.tip}>!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tip: {
    fontSize: 18,
  },
  login: { 
    color: 'red', 
    fontSize: 20 
  }
})