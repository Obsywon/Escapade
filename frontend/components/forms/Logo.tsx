import React, { memo } from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import PropTypes from 'prop-types';

interface LogoProps {
  style?: ViewStyle;
}

const Logo: React.FC<LogoProps> = ({ style }) => (
  <Image 
    source={require('../../assets/logo.png')} 
    style={[styles.image, style]}
  />
);

Logo.propTypes = {
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  image: {
    // width: 128,
    // height: 128,
    // marginBottom: 12,
  },
});

export default memo(Logo);
