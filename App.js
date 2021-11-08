/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import NavigationContainer from './src/navigation';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {Node} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App: () => Node = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
