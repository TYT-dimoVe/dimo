import { CHeader, CInput, CText } from 'components';
import { COLOR, HEADER_TYPE, ratio } from 'config/themeUtils';
import { seatsState } from 'pages/ChooseSeat/model';
import React from 'react';
import { SafeAreaView, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import getDirections from 'react-native-google-maps-directions';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { PlainAction } from 'redux-typed-actions';
import { convertMoney } from 'utils/function';
import { constant, latlng } from '../constant';
import { SearchTrips } from 'pages/Home/redux/actions';
import { homeState } from 'pages/Home/model';
import { UpdateTranship } from '../redux/actions';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.HomeKey] || {}),
    ...(state[constant.SeatKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    searchTrips: (val: any) => dispatch(SearchTrips.get(val)),
    updateTranship: (val: any) => dispatch(UpdateTranship.get(val))
  };
};

interface Props extends NavigationInjectedProps, seatsState, homeState {
  searchTrips: (val: any) => void;
  updateTranship: (val: any) => void;
}

interface State {
  add: string;
}

export class TranshipmentComponent extends React.Component<Props, State> {

  static navigationOptions = () => ({
    header: null,
  });
  headerHeight: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      add: '',
    };
  }
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
              {this.props.round === 1 ? this.props.seatRound1.seats.map((seat, index) => {
                return (
                  <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
                    {seat}
                    {index === this.props.seatRound1.seats.length - 1 ? '' : ', '}
                  </CText>
                );
              }) : this.props.seatRound2.seats.map((seat, index) => {
                return (
                  <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
                    {seat}
                    {index === this.props.seatRound2.seats.length - 1 ? '' : ', '}
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
              {convertMoney(this.props.round === 1 ? this.props.seatRound1.totalPrice : this.props.seatRound2.totalPrice)}
            </CText>
          </View>
        </View>
      </View>
    );
  };

  renderInput = () => {
    return (
      <View>
        <View style={styles.viewWrap}>
        <CText bold fontSize={18} color={COLOR.DARK_BLUE}>Địa điểm trung chuyển đến  - Nếu có</CText>
          <CInput
          style={styles.containerInput}
          placeholder={'Nhập địa điểm trung chuyển'}
          value={this.state.add}
          onChangeText={(text: string) => this.setState({ add: text})}
          textSize={18}
        />
      </View>
      <CText bold color={COLOR.PRIMARY_ORANGE} fontSize={16} style={{ marginHorizontal: 15 * ratio}}>* Xe trung chuyển chạy trong bán kính 2km đối với điểm đến/ điểm đi</CText>
      </View>
    );
  };

  renderBtn = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 10 * ratio,
        }}>
        <TouchableOpacity
          style={[styles.btnWrap, {backgroundColor: COLOR.PRIMARY_BLUE}]}
          onPress={() => this.viewDirection()}>
          <CText bold color={COLOR.WHITE} fontSize={20}>
            Xem lộ trình
          </CText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnWrap, {backgroundColor: COLOR.PRIMARY_ORANGE}]}
          onPress={() => this.searchTrips()}>
          <CText bold color={COLOR.WHITE} fontSize={20}>
            Tiếp tục
          </CText>
        </TouchableOpacity>
      </View>
    );
  };

  searchTrips = () => {
    if (this.props.isRoundTrip === true && this.props.round === 1) {
      const searchVal = {
        from: this.props.dropDownCode,
        to: this.props.pickUpCode,
        date: this.props.roundTripDate,
        page: 1,
        round: 2,
        round1Date: this.props.date,
      };
      this.props.searchTrips(searchVal)
    } else {
      this.props.navigation.navigate('Infomation')
    }
    let tranship = {}
    if (this.props.round === 1) {
      tranship = {
        tranship1: this.state.add
      }
    } else {
      tranship = {
        tranship2: this.state.add
      }
    }
    this.props.updateTranship(tranship)
  }

  viewDirection = () => {
    const data = {
      source: this.convertLatLng(this.props.pickUpCode),
      destination: this.convertLatLng(this.props.dropDownCode),
      params: [],
      waypoints: [],
    };

    getDirections(data);
  };

  convertLatLng = (city: string) => {
    if (city === 'NHATRANG') {
      return latlng.NHATRANG
    }
    if (city === 'SAIGON') {
      return latlng.SAIGON
    }
    if (city === 'DALAT') {
      return latlng.DALAT
    }
    if (city === 'VUNGTAU') {
      return latlng.VUNGTAU
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CHeader
          type={HEADER_TYPE.NORMAL}
          headerTitle={'Trung chuyển'}
          onBack={() => this.props.navigation.goBack()}
        />
        <KeyboardAvoidingView style={styles.listWrap}>
          {this.renderInput()}
          {this.renderInfo()}
          {this.renderBtn()}
        </KeyboardAvoidingView>
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
    paddingTop: 24 * ratio,
    justifyContent: 'space-between',
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
    paddingHorizontal: 15 * ratio,
    paddingVertical: 10 * ratio
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
    // marginTop: 16 * ratio,
    // marginHorizontal: 20 * ratio,
    height: 45 * ratio,
    marginBottom: 36 * ratio,
    width: 165 * ratio,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerInput: {
    marginVertical: 8 * ratio,
    borderWidth: 1 * ratio,
    borderRadius: 9 * ratio,
    borderColor: COLOR.PRIMARY_BLUE,
    height: 54 * ratio,
    alignItems: 'center',
  },
});
