import { ratio, ratioH, ratioW, COLOR } from 'config/themeUtils';
import React from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { CText } from 'components';

interface Props {
  headerTitle?: string;
  onBack?: () => void;
}

class NormalHeader extends React.Component<Props, {}> {
  static defaultProps = {
    headerTitle: 'Tra cứu',
    onBack: () => {},
  };

  render() {
    return (
      <ImageBackground
        source={require('assets/imgs/header2.png')}
        style={styles.background}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.headerWrap}>
          <TouchableOpacity style={styles.iconContainer} onPress={this.props.onBack}>
              <Feather name={'chevron-left'} color={COLOR.WHITE} size={24 * ratio}/>
          </TouchableOpacity>
          <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <CText bold color={COLOR.WHITE} fontSize={20}>{this.props.headerTitle}</CText>
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
    flex: 0.2,
    alignItems: 'flex-start',
  },
});

export default NormalHeader;
