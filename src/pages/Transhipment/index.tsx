import { CHeader, CText } from 'components';
import { COLOR, HEADER_TYPE, ratio } from 'config/themeUtils';
import { seatsState } from 'pages/ChooseSeat/model';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { PlainAction } from 'redux-typed-actions';
import { convertMoney } from 'utils/function';
import { constant } from './constant';
import { SearchOrder } from './redux/actions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.HomeKey] || {}),
    ...(state[constant.SeatKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    searchOrder: (val: any) => dispatch(SearchOrder.get(val)),
  };
};

interface Props extends NavigationInjectedProps, seatsState {
  searchOrder: (val: any) => void;
}

interface State {}

export class TranshipmentComponent extends React.Component<Props, State> {
  renderInfo = () => {
    return (
      <View style={{margin: 10 * ratio}}>
        <CText bold fontSize={24} color={COLOR.DARK_BLUE}>
          Thông tin vé
        </CText>
        <View>
          <View
            style={[
              styles.row,
              {justifyContent: 'space-between', paddingVertical: 10 * ratio},
            ]}>
            <CText bold fontSize={16} color={COLOR.DARK_BLUE}>
              Vị trí đã chọn
            </CText>
            <View style={[styles.row, {justifyContent: 'flex-end'}]}>
              {this.props.seats.map((seat, index) => {
                return (
                  <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
                    {seat}
                    {index === this.props.seats.length - 1 ? '' : ', '}
                  </CText>
                );
              })}
            </View>
          </View>
          <View
            style={[
              styles.row,
              {justifyContent: 'space-between', paddingVertical: 10 * ratio},
            ]}>
            <CText bold fontSize={16} color={COLOR.DARK_BLUE}>
              Tổng tiền
            </CText>
            <CText bold fontSize={16} color={COLOR.RED}>
              {convertMoney(this.props.totalPrice)}
            </CText>
          </View>
        </View>
      </View>
    );
  };

  renderMap = () => {
    return (
      <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CHeader
          type={HEADER_TYPE.NORMAL}
          headerTitle={'Trung chuyển'}
          onBack={() => this.props.navigation.goBack()}
        />
        <View style={styles.listWrap}>
          {this.renderMap()}
          {this.renderInfo()}
        </View>
      </SafeAreaView>
    );
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

const TranshipmentScreen = enhancer(TranshipmentComponent);

export default TranshipmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrap: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    marginTop: -24 * ratio,
    borderTopRightRadius: 24 * ratio,
    borderTopLeftRadius: 24 * ratio,
    paddingTop: 20 * ratio,
  },
  viewWrap: {
    backgroundColor: COLOR.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 4 * ratio,
      height: 3 * ratio,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2 * ratio,
    borderRadius: 9 * ratio,
    marginHorizontal: 20 * ratio,
    marginTop: 8 * ratio,
    marginBottom: 8 * ratio,
    padding: 15 * ratio,
  },
  containerInput: {
    marginVertical: 8 * ratio,
    borderWidth: 1 * ratio,
    borderRadius: 9 * ratio,
    borderColor: COLOR.DEACTIVE_GRAY,
    height: 64 * ratio,
    alignItems: 'center',
  },
  btnWrap: {
    borderRadius: 9 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 4 * ratio,
      height: 3 * ratio,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2 * ratio,
    marginTop: 16 * ratio,
    marginHorizontal: 20 * ratio,
    height: 60 * ratio,
    marginBottom: 36 * ratio,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
