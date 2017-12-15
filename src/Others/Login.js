import React from 'react'
import PropTypes from 'prop-types'
import { 
  View,
  Text,
  Alert,
  Vibration,
  TextInput,
  StyleSheet,
  NativeModules,
  TouchableHighlight,
  LayoutAnimation,
} from 'react-native'

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

import Camera from 'react-native-camera'
import Icon from 'react-native-vector-icons/Ionicons'

import QRMask from './QRMask'

export default class Login extends React.Component {

  constructor() {
    super()

    this.state = {
      selectType: '',
      inputText: '',
      totalFrame: {},
      scannerFrame: {},
      token: null
    }
    this._switchToInputToken = this.switchToInputToken.bind(this)
    this._switchToScanCode = this.switchToScanCode.bind(this)
    this._barCodeRead = this.barCodeRead.bind(this)
    this._login = this.login.bind(this)
  }

  static SELECTTYPECODE = 'SELECTTYPECODE'
  static SELECTTYPETOKEN = 'SELECTTYPETOKEN'

  static propTypes = {
    onHide: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onHide: () => {},
    onLogin: () => {}
  }

  switchToInputToken() {
    this._updateSelectType(Login.SELECTTYPETOKEN)
  }

  switchToScanCode() {
    Camera.checkDeviceAuthorizationStatus()
      .then(auth => {
        if (auth) {
          this._updateSelectType(Login.SELECTTYPECODE)
        } else {
          Alert.alert(
            '提示',
            '您未授权 App 使用摄像头, 请开启权限',
            [
              { text: '重试', onPress: () => this._renderContent() },
              { text: '取消', onPress: () => console.log('OK Pressed'), style: 'cancel' }
            ],
            { cancelable: false }
          )
        }
      }).catch(error => {
        Alert.alert(
          '提示',
          '请求授权失败, 请重试',
          [
            { text: '重试', onPress: () => this._renderContent() },
            { text: '取消', onPress: () => console.log('OK Pressed'), style: 'cancel' }
          ],
          { cancelable: false }
        )
      })
  }

  _updateSelectType(selectType) {
    if (this.state.selectType === selectType) {
      return
    }

    LayoutAnimation.spring()
    this.setState({
      token: null, // 每次切换都要将 token 置位 null
      selectType: selectType,
    })
  }

  barCodeRead(e) {
    // 如果已经识别出来应该直接返回
    if (this.state.token) {
      return
    }

    // 只有二维码真正的放到扫描框的时候才会计算
    const codeFrame = e.bounds;
    const scannerFrame = this.state.scannerFrame;
    const scannerY = (this.state.totalFrame.height - scannerFrame.height) / 2
    if (scannerFrame.x <= codeFrame.origin.x
      && scannerY <= codeFrame.origin.y
      && scannerFrame.width >= codeFrame.size.width
      && scannerFrame.height >= codeFrame.size.height) {
      Vibration.vibrate()
      this.setState({
        token: e.data
      }, this._login) // 刷新完 token 之后登录
    }
  }

  login() {
    if (this.state.token && !this.state.token.lenth) {
      this.props.onLogin(this.state.token)
      this.props.onHide()
    }
  }

  _renderContent() {
    if (this.state.selectType) {
      if (this.state.selectType === Login.SELECTTYPETOKEN) {
        return (
          <TextInput
            placeholder="请输入你的 Access Token 用于登录"
            clearButtonMode="while-editing"
            onChangeText={(newText) => this.setState({
              token: newText
            })}
            value={this.state.token}
            style={styles.inputText}
          />
        )
      } else if (this.state.selectType === Login.SELECTTYPECODE) {
        return (
          <View style={{flex: 1}}>
            <Camera onBarCodeRead={this._barCodeRead} style={styles.camera}>
              <QRMask
                onTotalLayoutChanged={(frame) => this.setState({
                  totalFrame: frame
                })}
                onScannerLayoutChanged={(frame) => this.setState({
                  scannerFrame: frame
                })}
                />
            </Camera>
          </View>
        )
      }
    }
  }

  render() {
    return (
      <View style={styles.container} >
        {this._renderContent()}
        <View style={styles.loginType} >
          <Icon.Button
            size={20}
            name="ios-camera"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            style={styles.loginBtn}
            onPress={this._switchToScanCode}
          >
            <Text style={styles.loginTxt}>扫码登录</Text>
          </Icon.Button>
          <View style={{ marginTop: 10 }} >
            <Icon.Button
              size={20}
              name="ios-book-outline"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              style={styles.loginBtn}
              onPress={this.state.selectType === Login.SELECTTYPETOKEN ? this._login : this._switchToInputToken}
            >
              <Text style={styles.loginTxt}>
                {this.state.selectType === Login.SELECTTYPETOKEN
                  ? '立即登录' : '键入 Token 登录'}
              </Text>
            </Icon.Button>
          </View>
        </View>
        <TouchableHighlight
          style={styles.closeBtn}
          onPress={this.props.onHide}
          underlayColor="transparent"
        >
          <Icon
            size={40}
            name="ios-close"
          />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  closeBtn: {
    position: 'absolute',
    top: 25,
    right: 15
  },
  loginBtn: {
    padding: 10
  },
  loginTxt: {
    color: 'white'
  },
  inputText: {
    marginHorizontal: 20,
    borderColor: 'red',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    borderRadius: 5
  },
  camera: { 
    flex: 1
  },
  loginType: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  }
})