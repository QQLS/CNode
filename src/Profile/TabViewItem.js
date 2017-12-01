import React, { Component } from 'react'
import { View, Text, ListView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { BASE_URL, TOPICS } from '../Configures/api';
import request from '../Utils/request';

import TabViewRow from './TabViewRow';

export default class TabViewItem extends Component {
  constructor(props) {
    super(props)

    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      currentPage: 0,
      dataSource: ds.cloneWithRows([])
    }

    this.requestData = this._requestData.bind(this)
    this.renderRow = this._renderRow.bind(this)
  }

  static propTypes = {
    tab: PropTypes.string.isRequired
  }

  static defaultProps = {
    tab: ''
  }

  _requestData() {
    request.get(BASE_URL + TOPICS, {
      tab: this.props.tab,
      page: this.state.currentPage,
      limit: 20
    })
      .then((response) => {
        if (response.success) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(
              response.data
            )
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  _renderRow(rowData) {
    return <TabViewRow data={rowData} />
  }

  componentDidMount() {
    this._requestData()
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={() => <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#eee' }} />}
          enableEmptySections={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})