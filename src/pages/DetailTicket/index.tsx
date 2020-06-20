import {CHeader, CText, CInput} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import moment from 'moment';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationInjectedProps} from 'react-navigation';
import {connect} from 'react-redux';
import {PlainAction} from 'redux-typed-actions';
import {constant} from './constant';
import {SearchOrder} from './redux/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {FormikErrors, FormikProps, withFormik} from 'formik';
import {orderState} from 'pages/SearchOrder/model';
import {formatCurrency} from 'utils/function';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.HomeKey] || {}),
    ...(state[constant.OrderKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    searchOrder: (val: any) => dispatch(SearchOrder.get(val)),
  };
};

interface Props extends NavigationInjectedProps, orderState {
  searchOrder: (val: any) => void;
}

interface State {}

export class DetailOrderComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  renderCustomerInfo = () => {
    const {order} = this.props;
    return (
      <View>
        <View style={styles.infoWrap}>
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Họ và tên hành khách
          </CText>
          <CText bold color={COLOR.PRIMARY_ORANGE} fontSize={16}>
            {order?.customerName}
          </CText>
        </View>
        <View style={styles.infoWrap}>
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Số điện thoại
          </CText>
          <CText bold color={COLOR.PRIMARY_ORANGE} fontSize={16}>
            {order?.phoneNumber}
          </CText>
        </View>
        <View style={styles.infoWrap}>
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Email
          </CText>
          <CText bold color={COLOR.PRIMARY_ORANGE} fontSize={16}>
            {order?.customerEmail}
          </CText>
        </View>
      </View>
    );
  };

  renderTicketInfo = () => {
    const {order} = this.props;
    return (
      <View>
        <View style={styles.infoWrap}>
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Mã số vé
          </CText>
          <CText bold color={COLOR.PRIMARY_ORANGE} fontSize={16}>
            {order?.ticketId}
          </CText>
        </View>
        <View style={styles.infoWrap}>
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Tuyến xe
          </CText>
          <CText bold color={COLOR.PRIMARY_ORANGE} fontSize={16}>
            {order?.phoneNumber}
          </CText>
        </View>
        <View style={styles.infoWrap}>
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Nhà xe
          </CText>
          <CText bold color={COLOR.PRIMARY_ORANGE} fontSize={16}>
            {order?.busOperator}
          </CText>
        </View>
        <View style={styles.infoWrap}>
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Địa điểm khởi hành
          </CText>
          <CText bold color={COLOR.PRIMARY_ORANGE} fontSize={16}>
            {order?.customerEmail}
          </CText>
        </View>
        <View style={styles.infoWrap}>
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Thời gian khởi hành
          </CText>
          <CText bold color={COLOR.PRIMARY_ORANGE} fontSize={16}>
            {moment(order?.departureDay).format('DD/MM/YYYY HH:mm')}
          </CText>
        </View>
        <View style={styles.infoWrap}>
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Số ghế/giường
          </CText>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            {order?.seatId.map((item, index) => (
              <CText bold color={COLOR.PRIMARY_ORANGE} fontSize={16}>
                {item}{index === order?.seatId.length - 1 ? '' : ', '}
              </CText>
            ))}
          </View>
        </View>
        <View style={styles.infoWrap}>
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Tổng tiền
          </CText>
          <CText bold color={COLOR.RED} fontSize={16}>
            {formatCurrency(order?.totalPrice)}đ
          </CText>
        </View>
      </View>
    );
  };

  renderTicketStatus = () => {
    const {order} = this.props;
    return (
      <View>
        <View style={styles.infoWrap}>
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Trạng thái
          </CText>
          <CText bold color={order?.paymentStatus === true ? COLOR.GREEN : COLOR.RED}  fontSize={16}>
            {order?.paymentStatus === true 
            ? 'Đã thanh toán' : 'Chưa thanh toán'}
          </CText>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CHeader
          type={HEADER_TYPE.NORMAL}
          headerTitle={'Chi tiết vé'}
          onBack={() => this.props.navigation.goBack()}
        />
        <View style={styles.listWrap}>
          {this.renderCustomerInfo()}
          <View style={styles.separateLine} />
          {this.renderTicketInfo()}
          <View style={styles.separateLine} />
          {this.renderTicketStatus()}
        </View>
      </SafeAreaView>
    );
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

const DetailOrderScreen = enhancer(DetailOrderComponent);

export default DetailOrderScreen;

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
  infoWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8 * ratio,
    paddingHorizontal: 20 * ratio,
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
  separateLine: {
    height: 8 * ratio,
    backgroundColor: COLOR.LIGHT_GRAY,
  },
});
