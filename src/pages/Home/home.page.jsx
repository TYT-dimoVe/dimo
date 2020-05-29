import React from 'react';
import {StyleSheet, View} from 'react-native';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {test} = this.props;
    return (
      <View style={styles.container}>
        <Text>home nè</Text>
      </View>
    );
  }
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
