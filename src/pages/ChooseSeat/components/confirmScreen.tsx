import {CHeader, CText, CInput} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import {seatsState} from 'pages/ChooseSeat/model';
import {homeState} from 'pages/Home/model';
import {SearchTrips} from 'pages/Home/redux/actions';
import {searchState} from 'pages/SearchTrip/model';
import React from 'react';
import { StyleSheet, View, Platform, InputAccessoryView} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationInjectedProps} from 'react-navigation';
import {connect} from 'react-redux';
import {PlainAction} from 'redux-typed-actions';
import {convertMoney} from 'utils/function';
import {constant} from '../constant';
import {UpdateTranship, GetPaymentMethod} from '../redux/actions';
import { SubmitPromoteCode } from 'pages/SearchTrip/redux/actions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.HomeKey] || {}),
    ...(state[constant.SeatKey] || {}),
    ...(state[constant.SearchKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    searchTrips: (val: any) => dispatch(SearchTrips.get(val)),
    updateTranship: (val: any) => dispatch(UpdateTranship.get(val)),
    getPaymentMethod: () => dispatch(GetPaymentMethod.get()),
    submitPromoteCode: (val: any) => dispatch(SubmitPromoteCode.get(val))
  };
};

interface Props
  extends NavigationInjectedProps,
    seatsState,
    searchState,
    homeState {
  searchTrips: (val: any) => void;
  updateTranship: (val: any) => void;
  getPaymentMethod: () => void;
  submitPromoteCode: (val: any) => void;
}

interface State {
  promotionCode: string;
}

export class ConfirmComponent extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null,
  });
  headerHeight: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      promotionCode: '',
    };
  }

  renderInfo = (type: number) => {
    return (
      <View style={{marginHorizontal: 10 * ratio}}>
        <View>
          <View style={styles.textWrap}>
            <CText bold fontSize={16} color={COLOR.DARK_BLUE}>
              Tuyến xe
            </CText>
            <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
              {type === 1
                ? `${this.props.pickUpCity} - ${this.props.dropDownCity}`
                : `${this.props.dropDownCity} - ${this.props.pickUpCity}`}
            </CText>
          </View>
          <View style={styles.textWrap}>
            <CText bold fontSize={16} color={COLOR.DARK_BLUE}>
              Nhà xe
            </CText>
            <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
              {type === 1
                ? this.props.round1?.busOperator
                : this.props.round2?.busOperator}
            </CText>
          </View>
          <View style={styles.textWrap}>
            <CText bold fontSize={16} color={COLOR.DARK_BLUE}>
              Địa điểm khởi hành
            </CText>
            <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
              {type === 1
                ? this.props.round1?.pickUp
                : this.props.round2?.pickUp}
            </CText>
          </View>
          <View style={styles.textWrap}>
            <CText bold fontSize={16} color={COLOR.DARK_BLUE}>
              Thời gian khởi hành
            </CText>
            <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
              {type === 1
                ? this.props.round1?.timeStart
                : this.props.round2?.timeStart}
            </CText>
          </View>
          <View style={styles.textWrap}>
            <CText bold fontSize={16} color={COLOR.DARK_BLUE}>
              Ngày khởi hành
            </CText>
            <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
              {type === 1 ? this.props.round1?.date : this.props.round2?.date}
            </CText>
          </View>
          <View style={styles.textWrap}>
            <CText bold fontSize={16} color={COLOR.DARK_BLUE}>
              Vị trí đã chọn
            </CText>
            <View style={[styles.row, {justifyContent: 'flex-end'}]}>
              {type === 1
                ? this.props.seatRound1.seats.map((seat, index) => {
                    return (
                      <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
                        {seat}
                        {index === this.props.seatRound1.seats.length - 1
                          ? ''
                          : ', '}
                      </CText>
                    );
                  })
                : this.props.seatRound2.seats.map((seat, index) => {
                    return (
                      <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
                        {seat}
                        {index === this.props.seatRound2.seats.length - 1
                          ? ''
                          : ', '}
                      </CText>
                    );
                  })}
            </View>
          </View>
          <View style={styles.textWrap}>
            <CText bold fontSize={16} color={COLOR.DARK_BLUE}>
              Tổng tiền
            </CText>
            <CText bold fontSize={16} color={COLOR.RED}>
              {convertMoney(
                type === 1
                  ? this.props.seatRound1.totalPrice * (1 - this.props.promotePercent)
                  : this.props.seatRound2.totalPrice * (1 - this.props.promotePercent),
              )}
            </CText>
          </View>
        </View>
      </View>
    );
  };

  renderBtn = () => {
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.btnWrap,
            {
              backgroundColor: COLOR.PRIMARY_ORANGE,
            },
          ]}
          onPress={() => {
            this.props.getPaymentMethod();
          }}>
          <CText bold color={COLOR.WHITE} fontSize={20}>
            Xác nhận
          </CText>
        </TouchableOpacity>
      </View>
    );
  };

  renderCustomerInfo = () => {
    return (
      <View style={{marginHorizontal: 10 * ratio, flex: 1}}>
        <View>
          <View style={styles.textWrap}>
            <CText bold fontSize={16} color={COLOR.DARK_BLUE}>
              Họ và tên hành khách
            </CText>
            <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
              {this.props.customerInfo.customerName || ''}
            </CText>
          </View>
          <View style={styles.textWrap}>
            <CText bold fontSize={16} color={COLOR.DARK_BLUE}>
              Số điện thoại
            </CText>
            <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
              {this.props.customerInfo.phoneNumber || ''}
            </CText>
          </View>
          {this.props.customerInfo?.customerEmail !== '' && (
            <View style={styles.textWrap}>
              <CText bold fontSize={16} color={COLOR.DARK_BLUE}>
                Email
              </CText>
              <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
                {this.props.customerInfo.customerEmail || ''}
              </CText>
            </View>
          )}
        </View>
      </View>
    );
  };

  renderPromotionCode = () => {
    return (
          <View style={styles.viewWrap}>
        <CInput
          style={styles.containerInput}
          placeholder={'Mã khuyến mãi'}
          value={this.state.promotionCode}
          onChangeText={(text: string) =>
            this.setState({promotionCode: text})
          }
          textSize={18}
          editable={!this.props.isDisableBtn}
        />
        <TouchableOpacity
          style={[
            styles.promoBtn,
            {
              backgroundColor: COLOR.PRIMARY_BLUE,
              width: 135 * ratio,
              marginLeft: 16 * ratio,
            },
          ]}
          disabled={this.props.isDisableBtn}
          onPress={() => {
            const val = {
              promotionCode: this.state.promotionCode.toUpperCase(),
            }
            this.props.submitPromoteCode(val)
          }}>
          <CText bold color={COLOR.WHITE} fontSize={20}>
            Xác nhận
          </CText>
        </TouchableOpacity>
        </View>

    );
  };

  render() {
    return (
            
      <KeyboardAwareScrollView>
      <View style={styles.container}>
        <CHeader
          type={HEADER_TYPE.NORMAL}
          headerTitle={'Xác nhận'}
          onBack={() => this.props.navigation.goBack()}
        />
        <View style={styles.listWrap}>
          <ScrollView style={{flex: 1}}>
            {this.renderCustomerInfo()}
            <View style={styles.separateLine} />
            {this.renderInfo(1)}
            {this.props.isRoundTrip && <View style={styles.separateLine} />}
            {this.props.isRoundTrip && this.renderInfo(2)}
          </ScrollView>
        </View>
        
        <View style={[styles.textWrap, {marginHorizontal: 10 * ratio}]}>
            <CText bold fontSize={18} color={COLOR.DARK_BLUE}>
            Thành tiền
            </CText>
            <CText bold fontSize={18} color={COLOR.RED}>
              {convertMoney(
                this.props.isRoundTrip
                  ? this.props.seatRound1.totalPrice * (1 - this.props.promotePercent) + this.props.seatRound2.totalPrice * (1 - this.props.promotePercent)
                  : this.props.seatRound1.totalPrice * (1 - this.props.promotePercent),
              )}
            </CText>
        </View>
        {this.renderPromotionCode()}                  
        {this.renderBtn()}
      </View>
      </KeyboardAwareScrollView>
    );
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

const ConfirmScreen = enhancer(ConfirmComponent);

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  listWrap: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    marginTop: -24 * ratio,
    borderTopRightRadius: 24 * ratio,
    borderTopLeftRadius: 24 * ratio,
    paddingTop: 10 * ratio,
  },
  viewWrap: {
    backgroundColor: COLOR.WHITE,
    marginHorizontal: 10 * ratio,
    marginTop: 8 * ratio,
    marginBottom: 8 * ratio,
    paddingHorizontal: 15 * ratio,
    paddingVertical: 10 * ratio,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 45 * ratio,
    marginBottom: 36 * ratio,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerInput: {
    borderWidth: 1 * ratio,
    borderRadius: 9 * ratio,
    borderColor: COLOR.PRIMARY_BLUE,
    height: 45 * ratio,
    alignItems: 'center',
    width: 180 * ratio,
  },
  textWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10 * ratio,
  },
  separateLine: {
    height: 8 * ratio,
    backgroundColor: COLOR.LIGHT_GRAY,
  },
  promoBtn: {
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
    height: 45 * ratio,
  },
});
