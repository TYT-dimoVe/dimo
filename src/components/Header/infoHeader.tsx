import { ratio, ratioH, ratioW, COLOR } from 'config/themeUtils';
import React from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { CText } from 'components';

interface Props {
  pickup?: string;
  dropdown?: string;
  headerSubtitle?: string;
  onBack?: () => void;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

class InfoHeader extends React.Component<Props, {}> {
  static defaultProps = {
    pickup: 'Sài Gòn',
    dropdown: 'Nha Trang',
    headerSubtitle: '20/06/2020',
    onBack: () => { },
    onLeftPress: () => { },
    onRightPress: () => { },
  };

  render() {
    return (
      <ImageBackground
        source={require('assets/imgs/header2.png')}
        style={styles.background}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.headerWrap}>
          <TouchableOpacity style={styles.iconContainer} onPress={this.props.onBack}>
            <Feather name={'chevron-left'} color={COLOR.WHITE} size={24 * ratio} />
          </TouchableOpacity>
          <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <CText bold color={COLOR.WHITE} fontSize={20}>{this.props.pickup}</CText>
              <Feather name={'arrow-right'} color={COLOR.WHITE} size={24 * ratio} />
              <CText bold color={COLOR.WHITE} fontSize={20}>{this.props.dropdown}</CText>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <TouchableOpacity onPress={this.props.onLeftPress}>
                <Feather name={'chevron-left'} color={COLOR.WHITE} size={24 * ratio} />
              </TouchableOpacity>
              <CText bold color={COLOR.WHITE} fontSize={20}>{this.props.headerSubtitle}</CText>
              <TouchableOpacity onPress={this.props.onRightPress}>
                <Feather name={'chevron-right'} color={COLOR.WHITE} size={24 * ratio} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.iconContainer}>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
  },
  headerWrap: {
    width: '100%',
    flexDirection: 'row',
    height: 144 * ratioH,
    paddingHorizontal: 16 * ratioW,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flex: 0.1,
    alignItems: 'flex-start',
  },
});

export default InfoHeader;
