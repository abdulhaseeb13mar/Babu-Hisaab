import React from 'react';
import {TextInput} from 'react-native';
import {useSelector} from 'react-redux';
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
  const height = useSelector(state => state.HeightReducer);
  return (
    <TextInput
      placeholder={placeholder}
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: color.lightGrey1,
        backgroundColor: 'white',
        elevation: 3,
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        paddingHorizontal: width * 0.04,
        marginTop: height * 0.05,
        marginHorizontal: width * 0.05,
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

export default Input;
