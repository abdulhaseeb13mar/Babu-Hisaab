import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {withTheme} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {width} from '../components';

const UserTile = ({
  item,
  onPress,
  style = {},
  imageStyle = {},
  isSelected = false,
}) => {
  const height = useSelector(state => state.HeightReducer);

  return (
    <View style={[styles(height).outWrapper, {...style}]}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles(height).cardContainer}
        onPress={() => onPress(item)}>
        {isSelected && (
          <FontAwesome
            name="check-circle-o"
            color="green"
            size={27}
            style={{
              position: 'absolute',
              top: -10,
              elevation: 4,
              right: width * 0.02,
            }}
          />
        )}
        <View style={styles(height).innerCardContainer}>
          <FastImage
            source={{uri: item.photo}}
            resizeMode="cover"
            style={[styles(height).imageStyle, {...imageStyle}]}
          />
          <Text style={styles(height).cardText} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = height =>
  StyleSheet.create({
    outWrapper: {
      width: '50%',
    },
    cardContainer: {
      alignItems: 'center',
      marginBottom: height * 0.03,
      borderRadius: 10,
    },
    innerCardContainer: {width: '100%', alignItems: 'center'},
    imageStyle: {
      width: '80%',
      aspectRatio: 460 / 384,
      borderRadius: 15,
      elevation: 3,
    },
    cardText: {fontWeight: 'bold', marginTop: height * 0.007, color: 'black'},
  });

export default withTheme(UserTile);
