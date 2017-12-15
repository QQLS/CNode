import React, { Component } from 'react'
import { View, Text, ListView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import TabViewRow from './TabViewRow';

export default class TabViewItem extends Component {
  constructor(props) {
    super(props)

    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      currentPage: 0,
      dataSource: ds.cloneWithRows(this.props.datas)
    }

    this._renderRow = this.renderRow.bind(this)
  }

  renderRow(rowData) {
    return <TabViewRow data={rowData} />
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={() => <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#eee' }} />}
          enableEmptySections={true}
        />
      </View>
    )
  }
}