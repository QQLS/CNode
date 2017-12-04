import React from 'react'
import { StackNavigator } from 'react-navigation'

import Publish from './Screen'

export default StackNavigator({
  Publish: {
    screen: Publish
  }
}, {
    initialRouteName: 'Publish'
  })