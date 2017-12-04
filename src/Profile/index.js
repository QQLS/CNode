import React from 'react'
import { StackNavigator } from 'react-navigation'

import Profile from './Screen'

export default StackNavigator({
  Profile: {
    screen: Profile
  }
}, {
    initialRouteName: 'Profile'
  })