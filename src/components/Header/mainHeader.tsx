import { ratio, ratioH, ratioW, COLOR } from 'config/themeUtils';
import React from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  viewNoti?: () => void;
  searchOrder?: () => void;
}

class MainHeader extends React.Component<Props, {}> {
  static defaultProps = {
    viewNoti: () => {},
    searchOrder: () => {}
  };

  render() {
    return (
      <ImageBackground
        source={require('assets/imgs/header1.png')}
        style={styles.background}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.headerWrap}>
          <TouchableOpacity style={styles.iconContainer} onPress={this.props.searchOrder}>
              <MaterialCommunityIcons name={'feature-search-outline'} color={COLOR.WHITE} size={24 * ratio}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconContainer, { marginLeft: 20 * ratio}]} onPress={this.props.viewNoti}>
              <MaterialIcons name={'notifications-none'} color={COLOR.WHITE} size={24 * ratio}/>
          </TouchableOpacity>
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
    justifyContent: 'flex-end',
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default MainHeader;
