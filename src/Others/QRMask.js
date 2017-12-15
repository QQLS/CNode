/**
 * 二维码扫描遮罩层
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet } from 'react-native';

export default class QRMask extends Component {

  static propTypes = {
    onTotalLayoutChanged: PropTypes.func,
    onScannerLayoutChanged: PropTypes.func,
  }

  // 测量整个遮罩层的 frame
  totalLayoutChanged(e) {
    if (this.props.onTotalLayoutChanged) {
      this.props.onTotalLayoutChanged(e.layout)
    }
  }

  // 测量扫描框的 frame
  scannerLayoutChanged(e) {
    if (this.props.onScannerLayoutChanged) {
      this.props.onScannerLayoutChanged(e.layout)
    }
  }

  render() {
    return (
      <View
        style={styles.container}
        onLayout={({ nativeEvent: e }) => this.totalLayoutChanged(e)}>

        <View style={styles.topMask} />
        <View style={styles.centerMask}>
          <View style={styles.sideMask} />
          <View
            style={styles.viewFinder}
            onLayout={({ nativeEvent: e }) => this.scannerLayoutChanged(e)}>
            {/*扫描框转角-左上角*/}
            <View style={[styles.leftTopCorner, styles.corner]} />
            {/*扫描框转角-右上角*/}
            <View style={[styles.rightTopCorner, styles.corner]} />
            {/*扫描框转角-左下角*/}
            <View style={[styles.leftBottomCorner, styles.corner]} />
            {/*扫描框转角-右下角*/}
            <View style={[styles.rightBottomCorner, styles.corner]} />
          </View>
          <View style={styles.sideMask} />
        </View>
        <View style={styles.bottomMask} />
      </View>
    )
  }
}

const kBorderCornerColor = 'navy'
const kMaskColor = 'rgba(0, 0, 0, 0.7)'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },

  corner: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  leftTopCorner: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopColor: kBorderCornerColor,
    borderLeftColor: kBorderCornerColor,
  },
  rightTopCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopColor: kBorderCornerColor,
    borderRightColor: kBorderCornerColor,
  },
  leftBottomCorner: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    borderLeftColor: kBorderCornerColor,
    borderBottomColor: kBorderCornerColor,
  },
  rightBottomCorner: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRightColor: kBorderCornerColor,
    borderBottomColor: kBorderCornerColor,
  },

  topMask: {
    flex: 1,
    backgroundColor: kMaskColor
  },
  centerMask: {
    flexDirection: 'row'
  },
  sideMask: {
    flex: 1,
    backgroundColor: kMaskColor
  },
  viewFinder: {
    width: 220,
    height: 220,
  },
  bottomMask: {
    flex: 1,
    backgroundColor: kMaskColor
  }
});
