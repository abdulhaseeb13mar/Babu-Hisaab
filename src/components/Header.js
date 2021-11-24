import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {width} from './index';
import {useSelector} from 'react-redux';

//======PROPS========
// leftIcon
// rightIcon
// leftIconAction
// leftIconName
// Title
// rightIconAction
// rightIconName
// titleStyle
// leftIconColor
// rightIconColor
// leftIconStyle
// rightIconStyle

const MyHeader = ({
  leftIcon,
  rightIcon,
  leftIconName,
  leftIconAction,
  leftIconColor,
  titleStyle,
  Title,
  rightIconAction,
  rightIconName,
  rightIconColor,
  leftIconStyle,
  rightIconStyle,
}) => {
  const LeftIconLibrary = leftIcon;
  const RightIconLibrary = rightIcon;

  const height = useSelector(state => state.HeightReducer);
  return (
    <View style={[styles.HeaderBarWrapper, {paddingVertical: height * 0.01}]}>
      <View style={styles.HeaderBarInnerWrapper}>
        {LeftIconLibrary ? (
          <TouchableOpacity onPress={leftIconAction} style={styles.IconWrap}>
            <LeftIconLibrary
              name={leftIconName}
              size={20}
              color={leftIconColor ? leftIconColor : 'green'}
              style={leftIconStyle ? leftIconStyle : {}}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              ...styles.IconWrap,
              elevation: 0,
              backgroundColor: 'transparent',
            }}
          />
        )}
        <Text style={{...styles.HeaderText, ...titleStyle}}>{Title}</Text>
        {RightIconLibrary ? (
          <TouchableOpacity onPress={rightIconAction} style={styles.IconWrap}>
            <RightIconLibrary
              name={rightIconName}
              size={20}
              color={rightIconColor ? rightIconColor : 'green'}
              style={rightIconStyle ? rightIconStyle : {}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={leftIconAction} style={styles.IconWrap}>
            <LeftIconLibrary
              name={leftIconName}
              size={20}
              color={leftIconColor ? leftIconColor : 'transparent'}
              style={leftIconStyle ? leftIconStyle : {}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  IconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
  },
  HeaderText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 21,
  },
  HeaderBarInnerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.93,
  },
  HeaderBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 5,
  },
});

export default MyHeader;
