/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {withTheme} from 'react-native-paper';

function WrapperScreen(props) {
  const {
    top,
    bottom,
    statusBar = props.theme.colors.background,
    barStyle = 'light-content',
    statusColor,
    theme,
    backgroundColor = theme.colors.background,
    style,
  } = props;
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: statusBar,
      }}>
      <View
        style={{
          height: insets.top,
          backgroundColor: statusColor,
        }}>
        <StatusBar translucent barStyle={barStyle} />
      </View>
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View
            style={{
              flex: 1,
              // marginTop: top === 0 ? top : insets.top,
              marginBottom: bottom === 0 ? bottom : insets.bottom,
              backgroundColor: backgroundColor,
              ...style,
            }}>
            {props.children}
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    </View>
  );
}

export default withTheme(WrapperScreen);
