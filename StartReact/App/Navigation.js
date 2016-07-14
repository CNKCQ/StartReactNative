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
} from 'react-native';

var Navigation = React.createClass({
  render: function(){
    return (
      <View style={styles.container}></View>
    );
  }
});
var styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: 'blue',
  },
});
module.exports = Navigation
