import React, { Component } from 'react'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

import TabViewItem from './TabViewItem'

const TabViews = [
  { tabLabel: '全部', tab: ''},
  { tabLabel: '精华', tab: 'good'},
  { tabLabel: '分享', tab: 'share'},
  { tabLabel: '问答', tab: 'ask'},
  { tabLabel: '招聘', tab: 'job'},
]

export default class Home extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    global.storage.save({
      key: 'userName', 
      data: '428a207c-070c-4491-bd75-b8bb7d6f4e34'
    })
    .then(response => {
      console.log('正确', response)
    })
    .catch(error => {
      console.log('错误', error)
    })
    global.storage.remove({
      key: 'userName'
    })
    .then(response => {
      console.log('正确', response)
    })
    .catch(error => {
      console.log('错误', error)
    })

    return (
      <ScrollableTabView renderTabBar={() => <DefaultTabBar style={{marginTop: 20}} />}>
        { TabViews.map(tabView => <TabViewItem key={tabView.tab} { ...tabView } />) }
      </ScrollableTabView>
    )
  }
}