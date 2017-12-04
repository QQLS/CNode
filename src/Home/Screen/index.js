import React, { Component } from 'react'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

import TabViewItem from '../Subpage/TabViewItem'
import { getToken } from '../../Utils'

const TabViews = [
  { tabLabel: '全部', tab: '' },
  { tabLabel: '精华', tab: 'good' },
  { tabLabel: '分享', tab: 'share' },
  { tabLabel: '问答', tab: 'ask' },
  { tabLabel: '招聘', tab: 'job' }
]

export default class Home extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <ScrollableTabView renderTabBar={() => <DefaultTabBar style={{ marginTop: 20 }} />}>
        {TabViews.map(tabView => <TabViewItem key={tabView.tab} { ...tabView } />)}
      </ScrollableTabView>
    )
  }
}