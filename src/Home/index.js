import React from 'react'
import { StackNavigator } from 'react-navigation'

import Home from './Screen'

export default StackNavigator({
  Home: {
    screen: Home
  }
}, {
  initialRouteName: 'Home'
});