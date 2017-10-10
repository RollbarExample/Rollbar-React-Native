/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  BackAndroid
} from 'react-native';

import { setJSExceptionHandler, getJSExceptionHandler } from 'react-native-exception-handler';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

import { Client } from 'rollbar-react-native';

const config = {
 accessToken: "5ccc6ba670fb43e698ca17c1d3e9a24c"
};
const rollbar = new Client(config);

export default class App extends Component<{}> {
  _onPressButton() {
    const reporter = (error) => {
      console.log(error);
    };

    const errorHandler = (e, isFatal) => {
      if (isFatal) {
        
        reporter(e);
        Alert.alert(
          'Unexpected error occurred',`Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}This is crash.`,
          [{
            text: 'Close',
            onPress: () => {
              BackAndroid.exitApp();
            }
          }]
        );
      } else {
        console.log(e); 
      }
    };

    setJSExceptionHandler(errorHandler);
    setNativeExceptionHandler((errorString) => {
      // e.error(errorString);
      console.log(errorString); 
      rollbar.error(errorString)
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Rollbar Example!
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Throw an error"
            color="#03A9F4"
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  buttonContainer: {
    marginTop: 200,
    margin: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});