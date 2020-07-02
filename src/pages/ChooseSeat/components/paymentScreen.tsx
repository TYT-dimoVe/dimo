import {CHeader, Check, CText} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import {seatsState} from 'pages/ChooseSeat/model';
import {homeState} from 'pages/Home/model';
import {searchState} from 'pages/SearchTrip/model';
import {SubmitTicket, Submit2Ticket} from 'pages/SearchTrip/redux/actions';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationInjectedProps} from 'react-navigation';
import {connect} from 'react-redux';
import {PlainAction} from 'redux-typed-actions';
import {constant} from '../constant';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.HomeKey] || {}),
    ...(state[constant.SeatKey] || {}),
    ...(state[constant.SearchKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    submitTicket: (val: any) => dispatch(SubmitTicket.get(val)),
    submit2Ticket: (val: any) => dispatch(Submit2Ticket.get(val)),
  };
};

interface Props
  extends NavigationInjectedProps,
    seatsState,
    searchState,
    homeState {
  getPaymentMethod: () => void;
  submitTicket: (val: any) => void;
  submit2Ticket: (val: any) => void;
}

interface State {
  chooseMethod: string;
  methodTitle: string;
}

export class PaymentComponent extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null,
  });
  headerHeight: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      chooseMethod: 'DIRECT',
      methodTitle: 'Thanh toán trực tiếp',
    };
  }

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
            this.submitPayment();
          }}>
          <CText bold color={COLOR.WHITE} fontSize={20}>
            Thanh toán
          </CText>
        </TouchableOpacity>
      </View>
    );
  };

  submitPayment = () => {
    if (this.props.isRoundTrip === true) {
      const round1 = {
        tripId: this.props.round1.tripId,
        totalPrice:
          this.props.seatRound1.totalPrice * (1 - this.props.promotePercent),
        busType: this.props.round1.busType,
        departureDay: this.props.round1.date,
        busOperator: this.props.round1.busOperator,
        busOperatorId: this.props.round1.busOperatorId,
        totalTicketAmount: this.props.seatRound1.seats?.length,
        seatId: this.props.seatRound1.seats,
      };
      const round2 = {
        tripId: this.props.round2.tripId,
        totalPrice:
          this.props.seatRound2.totalPrice * (1 - this.props.promotePercent),
        busType: this.props.round2.busType,
        departureDay: this.props.round2.date,
        busOperator: this.props.round2.busOperator,
        busOperatorId: this.props.round2.busOperatorId,
        totalTicketAmount: this.props.seatRound2.seats?.length,
        seatId: this.props.seatRound2.seats,
      };
      const val = {
        round1,
        round2,
        promotionId: this.props.promotionId,
        customerName: this.props.customerInfo.customerName,
        phoneNumber: this.props.customerInfo.phoneNumber,
        identityId: this.props.customerInfo.identityId,
        customerEmail: this.props.customerInfo.customerEmail || '',
        paymentCode: this.state.chooseMethod,
        paymentTitle: this.state.methodTitle,
        paymentStatus:
          this.state.chooseMethod === 'DIRECT' ||
          this.state.chooseMethod === 'BANK_TRANSFER'
            ? false
            : true,
        isShowModal: true,
      };
      this.props.submit2Ticket(val);
    } else {
      const val = {
        pay: {
          tripId: this.props.round1.tripId,
          totalPrice:
            this.props.seatRound1.totalPrice * (1 - this.props.promotePercent),
          busType: this.props.round1.busType,
          departureDay: this.props.round1.date,
          busOperator: this.props.round1.busOperator,
          busOperatorId: this.props.round1.busOperatorId,
          totalTicketAmount: this.props.seatRound1.seats?.length,
          seatId: this.props.seatRound1.seats,
          promotionId: this.props.promotionId,
          customerName: this.props.customerInfo.customerName,
          phoneNumber: this.props.customerInfo.phoneNumber,
          identityId: this.props.customerInfo.identityId,
          customerEmail: this.props.customerInfo.customerEmail || '',
          paymentCode: this.state.chooseMethod,
          paymentTitle: this.state.methodTitle,
          paymentStatus:
            this.state.chooseMethod === 'DIRECT' ||
            this.state.chooseMethod === 'BANK_TRANSFER'
              ? false
              : true,
        },
        isShowModal: true,
      };
      this.props.submitTicket(val);
    }
  };

  renderPaymentMethod = () => {
    return (
      <View style={{marginHorizontal: 10 * ratio}}>
        {this.props.paymentMethod.length > 0 &&
          this.props.paymentMethod.map((method) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.row}
                onPress={() =>
                  this.setState({
                    chooseMethod: method.code,
                    methodTitle: method.title,
                  })
                }>
                <Check
                  type={'radio'}
                  color={COLOR.PRIMARY_BLUE}
                  check={this.state.chooseMethod === method.code}
                  onPress={() =>
                    this.setState({
                      chooseMethod: method.code,
                      methodTitle: method.title,
                    })
                  }
                />
                <CText fontSize={16} color={COLOR.DARK_BLUE} bold>
                  {method.title}
                </CText>
              </TouchableOpacity>
            );
          })}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CHeader
          type={HEADER_TYPE.NORMAL}
          headerTitle={'Thanh toán'}
          onBack={() => this.props.navigation.goBack()}
        />
        <View style={styles.listWrap}>{this.renderPaymentMethod()}</View>

        {this.renderBtn()}
      </SafeAreaView>
    );
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

const PaymentScreen = enhancer(PaymentComponent);

export default PaymentScreen;

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
    paddingTop: 24 * ratio,
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
    paddingVertical: 10 * ratio,
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
    marginVertical: 8 * ratio,
    borderWidth: 1 * ratio,
    borderRadius: 9 * ratio,
    borderColor: COLOR.PRIMARY_BLUE,
    height: 54 * ratio,
    alignItems: 'center',
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
});
