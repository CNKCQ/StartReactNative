import Dimensions from 'Dimensions';
import React, { Component } from 'react';

import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  Navigator,
  NavigatorIOS,
  View,
  TouchableHighlight,
} from 'react-native';
import girlsList from './girlsList'
var REQUEST_URL = 'http://test.cmcaifu.com/api/v1/products/history/?page_size=20';
var Home = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCard}
        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading results...
        </Text>
      </View>
    );
  },

  renderCard: function(result) {
    return (
      <TouchableHighlight onPress= {() => this.skipIntoContent()
      }>
      <View style={styles.container}>
        <View style={[styles.innercontainer]}>
          <Text style={[styles.title]}>{result.name}</Text>
          <Text style={[styles.status]}>{result.status.message}</Text>
        </View>
        <View style={styles.linecontainer}>
        </View>
        <View style={styles.innercontainer}>
          <Text style={[styles.textposition,styles.orange]}>{result.rate/100}%</Text>
          <Text style={[styles.textposition,styles.orange]}>{result.period}天</Text>
          <Text style={[styles.textposition,styles.orange]}>{result.orders.count}人</Text>
        </View>
        <View style={styles.innercontainer}>
          <Text style={[styles.textposition,styles.gray]}>年化利率</Text>
          <Text style={[styles.textposition,styles.gray]}>投资期限</Text>
          <Text style={[styles.textposition,styles.gray]}>投资人数</Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  },

  skipIntoContent () {
    this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
      component: girlsList,
      title: 'girls'
    })// push一个route对象到navigator中
  },

});
var styles = StyleSheet.create({
  navcontainer: {
    backgroundColor: 'red',
    height: 64,
    width: Dimensions.get('window').width,
  },
  container: {
    flex: 1,
    paddingTop: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 120,
  },
  innercontainer: {
    flex: 1,
    marginTop: 6,
    marginBottom: 6,
    justifyContent: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    backgroundColor: '#FFFFFF',
  },
  title: {
     marginLeft: 25,
     width: Dimensions.get('window').width-64-50,
     textAlign: 'left',
  },
  status: {
    width: 64,
    height: 22,
    paddingTop: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 5,
    marginRight: 30,
    textAlign: 'center',
    color: '#d0d0d0',

  },
  textposition: {
    flex: 1,
    textAlign: 'center',
  },
  linecontainer: {
    width: Dimensions.get('window').width - 50,
    height: 1,
    backgroundColor: '#d0d0d0',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  separator: {
    height: 10,
    backgroundColor: '#f5f5f5',
  },
  orange: {
    color: '#fd9526',
    fontSize: 24,
  },
  gray: {
    color: '#d0d0d0',
  },
});

module.exports = Home;
