import React from 'react';
import { Modal, StatusBar, StyleSheet, View } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';

export interface Props {}

interface State {
  visible: boolean;
}

export default class LoadingFullScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  isHide = (): void => {
    this.setState({ visible: false });
  };

  isVisible = (): void => {
    this.setState({ visible: true });
  };

  render() {
    const { visible } = this.state;
    if (!visible) {
      return null;
    }
    return (
      <Modal
        animationType={'none'}
        onRequestClose={() => this.setState({ visible: false })}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={visible}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0.6)'} barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.background}>
            <UIActivityIndicator color="white" size={50} />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
