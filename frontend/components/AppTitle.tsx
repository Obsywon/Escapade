import React from 'react';
import {Text} from 'react-native-paper';

interface AppTitleProps {
  title: string;
}

const AppTitle = ({title}: AppTitleProps) => {
  return (
    <Text variant="displayLarge" style={styles.title}>
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

export default AppTitle;
