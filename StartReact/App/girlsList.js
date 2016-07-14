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

var REQUEST_URL = 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/1';
var girlsList = React.createClass({
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
        renderRow={this.renderGirl}
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

  renderGirl: function(result) {
    return (
      <TouchableHighlight onPress= {() => this.skipIntoContent(result)
      }>
      <View style={styles.container}>
      <Image source={{uri: result.url}}
        style={styles.thumbnail}/>
        <View style={[styles.innercontainer]}>
          <Text style={[styles.title]}>{result.desc}</Text>
          <Text style={[styles.status]}>{result.who}</Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  },

  skipIntoContent (result) {
    this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
      component: girlsList,
      title: result.desc
    })// push一个route对象到navigator中
  },

});
var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 240,
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

  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  separator: {
    height: 10,
    backgroundColor: '#f5f5f5',
  },
  thumbnail: {
    width: null, // 配合alignSelf实现宽度上 match_parent
    height: 260,
    backgroundColor: '#fd9526',
    alignSelf: 'stretch'
  },
});

module.exports = girlsList;
