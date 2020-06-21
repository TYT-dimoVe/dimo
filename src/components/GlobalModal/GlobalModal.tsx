import React from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLOR, ratio } from 'config/themeUtils';
import { CText } from 'components';
import LottieView from 'lottie-react-native';

export interface Props {}

interface State {
  isShow: boolean;
  type: string;
  content: string;
}

class ModalScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isShow: false,
      type: '',
      content: '',
    };
  }

  alertMessage = (iType: string, iContent: string) => {
    this.setState({
      isShow: true,
      type: iType,
      content: iContent,
    });
  };

  closeModal = () => {
    this.setState({ isShow: false });
  };

  convertIcon = (type: string) => {
    if (type === 'empty') {
      return (
        <LottieView
            source={require('assets/emptyList.json')}
            autoPlay
            loop
            style={{width: 78 * ratio, height: 78 * ratio}}
            resizeMode={'contain'}
        />
      )
    } else if ( type === 'error') {
      return (
        <LottieView
            source={require('assets/error.json')}
            autoPlay
            loop
            style={{width: 78 * ratio, height: 78 * ratio }}
            resizeMode={'contain'}
        />
      )
    } else {
      return (
        <LottieView
            source={require('assets/success.json')}
            autoPlay
            loop
            style={{width: 78 * ratio, height: 78 * ratio}}
            resizeMode={'contain'}
        />
      )
    }
  }

  render() {
    return (
      <Modal
        // animationType="fade"
        transparent={true}
        visible={this.state.isShow}
        onRequestClose={() => {
          this.closeModal();
        }}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0.6)'} barStyle="dark-content" />
        <TouchableWithoutFeedback onPress={() => this.closeModal()}>
          <View style={styles.main}>
            <View style={styles.boxContent}>
              <TouchableOpacity
                style={{ position: 'absolute', top: 16, right: 16 }}
                onPress={() => this.closeModal()}>
                <MaterialIcons size={24} color={'#43484B'} name={'close'} />
              </TouchableOpacity>
              <View style={styles.content}>
                {this.convertIcon(this.state.type)}
                <CText bold color={COLOR.DARK_BLUE} fontSize={16} numberOfLines={3} style={{ textAlign: 'center'}}>
                  {this.state.content}
                </CText>
                <TouchableOpacity style={styles.button} onPress={() => this.closeModal()}>
                  <CText bold color={COLOR.WHITE} fontSize={20}>Đồng ý</CText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

export default ModalScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContent: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    marginTop: 24 * ratio,
  },
  boxTitle: {
    padding: 16,
    textAlign: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#006AF4',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2D3D',
  },
  messgae: {
    fontSize: 16,
    color: '#1F2D3D',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: COLOR.PRIMARY_BLUE,
    height: 48,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginBottom: 30,
    marginTop: 10 * ratio
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
