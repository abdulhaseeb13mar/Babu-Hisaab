import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {width} from '.';
import {color} from '../theme';

const Input = ({
  placeholder = 'placeholder',
  value,
  onChangeText = () => {},
  keyboardType = 'default',
  style = {},
  ...props
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={{
        ...styles.Input,
        ...style,
      }}
      keyboardType={keyboardType}
      placeholderTextColor={color.lightGrey3}
      onChangeText={t => onChangeText(t)}
      value={value && value}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  Input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.lightGrey1,
    backgroundColor: 'white',
    elevation: 3,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: width * 0.04,
    marginHorizontal: width * 0.05,
  },
});

export default Input;
