import {ratio, ratioH, ratioW, COLOR} from 'config/themeUtils';
import React from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  viewNoti?: () => void;
  searchOrder?: () => void;
  notiStatus?: number;
}

class MainHeader extends React.Component<Props, {}> {
  static defaultProps = {
    viewNoti: () => {},
    searchOrder: () => {},
    notiStatus: 0,
  };

  render() {
    return (
      <ImageBackground
        source={require('assets/imgs/header1.png')}
        style={styles.background}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.headerWrap}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={this.props.searchOrder}>
            <MaterialCommunityIcons
              name={'feature-search-outline'}
              color={COLOR.WHITE}
              size={24 * ratio}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconContainer, {marginLeft: 20 * ratio}]}
            onPress={this.props.viewNoti}>
            <MaterialIcons
              name={'notifications-none'}
              color={COLOR.WHITE}
              size={24 * ratio}
            />
            {this.props.notiStatus > 0 && (
              <View
                style={{
                  width: 8 * ratio,
                  height: 8 * ratio,
                  position: 'absolute',
                  top: 0,
                  right: 3 * ratio,
                  backgroundColor: COLOR.RED,
                  borderRadius: 4 * ratio,
                }}
              />
            )}
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
