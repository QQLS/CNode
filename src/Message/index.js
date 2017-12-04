import React from 'react'
import { StackNavigator } from 'react-navigation'

import Message from './Screen'

export default StackNavigator({
  Message: {
    screen: Message
  }
}, {
  initialRouteName: 'Message'
})