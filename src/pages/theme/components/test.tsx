import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  test: boolean;
}

interface State {}

class ComponentName extends React.Component<Props, State> {
  static defaultProps = {
    test: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { test } = this.props;
    return <View style={styles.container} />;
  }
}

export default ComponentName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
