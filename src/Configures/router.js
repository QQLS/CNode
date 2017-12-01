import React from 'react'
import {
  TabNavigator,
  StackNavigator,
  TabBarBottom
} from 'react-navigation'
import {View} from 'react-native'

import Home from '../Home'
import Publish from '../Publish'
import Message from '../Message'
import Profile from '../Profile'

import Icon from 'react-native-vector-icons/Ionicons'

const configureNavigator = (route, screen) => {
  const NavRouteConfigs = {
    [route]: {
      screen: screen
    }
  };

  const NavNavigatorConfigs = {
  };

  return StackNavigator(NavRouteConfigs, NavNavigatorConfigs);
}

const configureTabItem = (route, screen, tabBarLabel, tabBarImage) => {
  return {
    screen: configureNavigator(route, screen), // 每个 TabItem 都有一个单独的 Navigator
    navigationOptions: {
      tabBarLabel: tabBarLabel,
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name={tabBarImage + (focused ? '' : '-outline')} size={29} color={tintColor} />
      }
    }
  }
};

const TabRouteConfigs = {
  Home: configureTabItem('Home', Home, '首页', 'ios-home'),
  Publish: configureTabItem('Publish', Publish, '发布', 'ios-book'),
  Message: configureTabItem('Message', Message, '消息', 'ios-mail-open'),
  Profile: configureTabItem('Profile', Profile, '我的', 'ios-happy'),
};

const TabNavigatorConfigs = {
  initialRouteName: 'Home',
  tabBarComponent: TabBarBottom,
  lazy: true,
  tabBarPosition: 'bottom',
  swipeEnabled: false
};

export default TabNavigator(TabRouteConfigs, TabNavigatorConfigs);
