import React from 'react';
import {Text} from 'react-native-paper';

interface MainTitleProps {
  title: string;
}

const MainTitle = ({title}: MainTitleProps) => {
  return (
    <Text variant="headlineLarge" style={styles.title}>
      {title}
    </Text>
  );
};

const styles = {
  title: {
    padding: 16,
    flex: 1,
  },
};

export default MainTitle;
