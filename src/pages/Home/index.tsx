import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { PlainAction } from 'redux-typed-actions';
import { constant } from './constant';
import { HEADER_TYPE, ratio, COLOR } from 'config/themeUtils';
import { CHeader, CText, Dropdown, Check } from 'components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GetCities, SearchTrips, SaveRoundTrip } from './redux/actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.HomeKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    getCities: () => dispatch(GetCities.get()),
    searchTrips: (val: any) => dispatch(SearchTrips.get(val)),
    saveRoundTrip: (val:any) => dispatch(SaveRoundTrip.get(val))
  };
};

export interface Props extends NavigationInjectedProps {
  getCities: () => void;
  cities: any;
  searchTrips: (val: any) => void;
  saveRoundTrip: (val:any) => void;
}

interface State {
  pickUpCity: string;
  dropdownCity: string;
  pickUpCode: string;
  dropdownCode: string;
  startDatePick: string;
  startCalendarVisible: boolean;
  isRoundTrip: boolean;
  endDatePick: string;
  endCalendarVisible: boolean;
  endDate: Date;
}

class HomeComponent extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null,
  });
  headerHeight: any;

  minDate = new Date();

  d = this.minDate.getDate();
  m = this.minDate.getMonth() + 2;
  y = this.minDate.getFullYear();
  maxDate = new Date(this.y, this.m, this.d); //2 tháng
  tomorow = new Date(this.y, this.m - 2, this.d + 1); //2 tháng

  constructor(props: Props) {
    super(props);
    this.state = {
      pickUpCity: '',
      dropdownCity: '',
      pickUpCode: '',
      dropdownCode: '',
      startDatePick: moment(this.minDate).format('DD/MM/YYYY'),
      startCalendarVisible: false,
      isRoundTrip: false,
      endDatePick: moment(this.tomorow).format('DD/MM/YYYY'),
      endCalendarVisible: false,
      endDate: this.tomorow,
    };
  }

  componentDidMount() {
    this.props.getCities();
  }

  renderCities = () => {
    return (
      <View style={styles.citiWrap}>
        <Dropdown
          containerStyle={styles.dropdownWrap}
          value={this.state.pickUpCity}
          data={this.props.cities.map((item: any) => {
            return {
              label: item.cityTitle,
              value: item.cityTitle,
            };
          })}
          label={'Chọn điểm khởi hành'}
          onChange={(value) => {
            let pickup = '';
            this.props.cities.map((item: any) => {
              if (item.cityTitle === value) {
                pickup = item.cityCode;
              }
            });
            this.setState({ pickUpCity: value, pickUpCode: pickup })
          }}
        />
        <View style={{ marginVertical: 7 * ratio, borderColor: '#000', borderStyle: 'dashed', borderWidth: 1 * ratio, borderRadius: 1, zIndex: 9999 }}>
          <TouchableOpacity activeOpacity={0.9} style={styles.swapIconWrap} onPress={() => this.switchCity()}>
            <View>
              <MaterialCommunityIcons name={'swap-vertical'} size={24 * ratio} color={'#000'} />
            </View>
          </TouchableOpacity>

        </View>
        <Dropdown
          containerStyle={[styles.dropdownWrap, { borderColor: COLOR.PRIMARY_ORANGE }]}
          value={this.state.dropdownCity}
          data={this.props.cities.filter((item: any) => item.cityTitle !== this.state.pickUpCity).map((item: any) => {
            return {
              label: item.cityTitle,
              value: item.cityTitle,
            };
          })}
          label={'Chọn điểm đến'}
          onChange={(value) => {
            let dropdown = '';
            this.props.cities.map((item: any) => {
              if (item.cityTitle === value) {
                dropdown = item.cityCode;
              }
            });
            this.setState({ dropdownCity: value, dropdownCode: dropdown })
          }}
        />
      </View>
    )
  }

  switchCity = () => {
    let tmp = this.state.dropdownCity;
    this.setState({ dropdownCity: this.state.pickUpCity, pickUpCity: tmp });
  }

  renderDatePick = () => {
    return (
      <View style={styles.datePickWrap}>
        <TouchableOpacity activeOpacity={0.9} style={styles.calendarWrap} onPress={() => this.setState({ startCalendarVisible: true })}>
          <Feather name={'calendar'} size={24 * ratio} color={COLOR.PRIMARY_BLUE} />
          <CText bold fontSize={18} color={COLOR.DARK_BLUE} style={{ marginLeft: 16 * ratio }}>{this.state.startDatePick}</CText>
        </TouchableOpacity>
      </View>
    )
  }

  renderChooseOption = () => {
    return (
      <View>
        <View style={styles.datePickWrap}>
          <CText bold color={COLOR.DARK_BLUE} fontSize={18}>Hành trình</CText>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 * ratio }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flex: 0.5 }} onPress={() => this.setState({ isRoundTrip: false })}>
              <Check
                style={{ padding: 0 }}
                type="radio"
                check={!this.state.isRoundTrip}
                color={COLOR.PRIMARY_BLUE}
              />
              <CText bold color={COLOR.DARK_BLUE} fontSize={18} style={{ marginLeft: 20 * ratio }}>Một chiều</CText>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.state.pickUpCity !== '' && this.state.dropdownCity !== '' ? false : true}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flex: 0.5 }}
              onPress={() => this.setState({ isRoundTrip: true })}>
              <Check
                style={{ padding: 0 }}
                type="radio"
                check={this.state.isRoundTrip}
                color={COLOR.PRIMARY_BLUE}
              />
              <CText bold color={COLOR.DARK_BLUE} fontSize={18} style={{ marginLeft: 20 * ratio }}>Khứ hồi</CText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderCitiesRound = () => {
    return (
      <View style={styles.citiWrap}>
        <View style={styles.roundCityWrap}>
          <CText bold fontSize={16} color={COLOR.DARK_BLUE}>{this.state.dropdownCity}</CText>
        </View>
        <View style={{ marginVertical: 7 * ratio, borderColor: '#000', borderStyle: 'dashed', borderWidth: 1 * ratio, borderRadius: 1, zIndex: 9999 }}></View>
        <View style={[styles.roundCityWrap, { borderColor: COLOR.PRIMARY_ORANGE }]}>
          <CText bold fontSize={16} color={COLOR.DARK_BLUE}>{this.state.pickUpCity}</CText>
        </View>
      </View>
    )
  }

  renderDatePickRound = () => {
    return (
      <View style={styles.datePickWrap}>
        <TouchableOpacity activeOpacity={0.9} style={styles.calendarWrap} onPress={() => this.setState({ endCalendarVisible: true })}>
          <Feather name={'calendar'} size={24 * ratio} color={COLOR.PRIMARY_BLUE} />
          <CText bold fontSize={18} color={COLOR.DARK_BLUE} style={{ marginLeft: 16 * ratio }}>{this.state.endDatePick}</CText>
        </TouchableOpacity>
      </View>
    )
  }

  renderRoundTrip = () => {
    return (
      <View>
        {this.renderCitiesRound()}
        {this.renderDatePickRound()}
      </View>
    )
  }

  renderSearchBtn = () => {
    if (this.state.pickUpCity === '' || this.state.dropdownCity === '') {
      return (
        <TouchableOpacity disabled={true} style={[styles.btnWrap, { backgroundColor: COLOR.DEACTIVE_GRAY }]}>
          <CText bold color={COLOR.WHITE} fontSize={24} >Tìm chuyến</CText>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={styles.btnWrap} onPress={() => this.searchTrips()}>
          <CText bold color={COLOR.WHITE} fontSize={24} >Tìm chuyến</CText>
        </TouchableOpacity>
      )
    }
  }

  searchTrips = () => {
    const searchVal = {
      from: this.state.pickUpCode,
      to: this.state.dropdownCode,
      date: this.state.startDatePick,
      page: 1
    }

    const saveRoundTrip = {
      isRoundTrip: this.state.isRoundTrip,
      roundTripPickUp: this.state.dropdownCode,
      roundTripDropDown: this.state.pickUpCode,
      roundTripDate: this.state.endDatePick,
    }

    this.props.searchTrips(searchVal);
    this.props.saveRoundTrip(saveRoundTrip);
  }

  render() {
    const { cities } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <CHeader type={HEADER_TYPE.MAIN} viewNoti={() => console.info('View noti')} searchOrder={() => console.info('Search order')} />
        <KeyboardAwareScrollView style={styles.listWrap}
          nestedScrollEnabled={false}
          showsVerticalScrollIndicator={false}>
          <CText color={COLOR.DARK_BLUE} fontSize={30} bold style={{ marginHorizontal: 20 * ratio, marginBottom: 8 * ratio }}>Xin chào,</CText>
          {this.renderCities()}
          {this.renderDatePick()}
          {this.renderChooseOption()}
          {this.state.isRoundTrip && this.renderRoundTrip()}
          {this.renderSearchBtn()}
        </KeyboardAwareScrollView>
        <Modal visible={this.state.startCalendarVisible} animationType="fade" transparent={true}>
          <TouchableWithoutFeedback onPress={() => this.setState({ startCalendarVisible: false })}>
            <View style={styles.modalWrap}>
              <View style={styles.modalCalendar}>
                <CalendarPicker
                  minDate={this.minDate}
                  maxDate={this.maxDate}
                  onDateChange={(date) => {
                    let newDate = moment(date).toDate();
                    let d = newDate.getDate() + 1;
                    let m = newDate.getMonth();
                    let y = newDate.getFullYear();
                    let endDate = new Date(y, m, d);
                    this.setState({ startDatePick: moment(date).format('DD/MM/YYYY'), startCalendarVisible: false, endDate: endDate, endDatePick: moment(endDate).format('DD/MM/YYYY') });
                  }}
                  todayBackgroundColor={COLOR.DEACTIVE_GRAY}
                  selectedDayColor={COLOR.DARK_BLUE}
                  selectedDayTextColor={COLOR.WHITE}
                  textStyle={{
                    fontFamily: 'SourceSansPro-Regular',
                    color: '#000000',
                  }}
                  weekdays={['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']}
                  months={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}
                  previousTitle="Trước"
                  nextTitle="Sau"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal visible={this.state.endCalendarVisible} animationType="fade" transparent={true}>
          <TouchableWithoutFeedback onPress={() => this.setState({ endCalendarVisible: false })}>
            <View style={styles.modalWrap}>
              <View style={styles.modalCalendar}>
                <CalendarPicker
                  minDate={this.state.endDate}
                  maxDate={this.maxDate}
                  onDateChange={(date) => {
                    this.setState({ endDatePick: moment(date).format('DD/MM/YYYY'), endCalendarVisible: false });
                  }}
                  todayBackgroundColor={COLOR.DEACTIVE_GRAY}
                  selectedDayColor={COLOR.DARK_BLUE}
                  selectedDayTextColor={COLOR.WHITE}
                  textStyle={{
                    fontFamily: 'SourceSansPro-Regular',
                    color: '#000000',
                  }}
                  weekdays={['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']}
                  months={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}
                  previousTitle="Trước"
                  nextTitle="Sau"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    );
  }
}

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps,
)

const HomeScreen = enhancer(HomeComponent);

export default HomeScreen;

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
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  citiWrap: {
    backgroundColor: COLOR.WHITE,
    height: 175 * ratio,
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
    padding: 15 * ratio
  },
  dropdownWrap: {
    height: 64 * ratio,
    width: '100%',
    fontSize: 18 * ratio,
    borderColor: COLOR.PRIMARY_BLUE,
    color: COLOR.DARK_BLUE
  },
  swapIconWrap: {
    position: 'absolute',
    right: 16 * ratio,
    top: -20 * ratio,
    backgroundColor: COLOR.WHITE,
    borderRadius: 9 * ratio,
    shadowColor: '#000',
    shadowOffset: {
      width: 4 * ratio,
      height: 3 * ratio,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2 * ratio,
    height: 38 * ratio,
    width: 32 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickWrap: {
    backgroundColor: COLOR.WHITE,
    borderRadius: 9 * ratio,
    shadowColor: '#000',
    shadowOffset: {
      width: 4 * ratio,
      height: 3 * ratio,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2 * ratio,
    height: 100 * ratio,
    marginHorizontal: 20 * ratio,
    marginTop: 8 * ratio,
    marginBottom: 8 * ratio,
    padding: 15 * ratio,
  },
  calendarWrap: {
    height: 64 * ratio,
    borderRadius: 9 * ratio,
    borderColor: COLOR.PRIMARY_BLUE,
    borderWidth: 1 * ratio,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16 * ratio,
    justifyContent: 'flex-start'
  },
  modalWrap: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalCalendar: {
    height: 310 * ratio,
    backgroundColor: COLOR.WHITE,
    borderTopRightRadius: 9 * ratio,
    borderTopLeftRadius: 9 * ratio,
    shadowColor: '#000',
    shadowOffset: {
      width: 10 * ratio,
      height: -20 * ratio,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10 * ratio,
  },
  btnWrap: {
    borderRadius: 9 * ratio,
    backgroundColor: COLOR.PRIMARY_ORANGE,
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
    marginBottom: 36 * ratio
  },
  roundCityWrap: {
    height: 64 * ratio,
    width: '100%',
    fontSize: 18 * ratio,
    borderColor: COLOR.PRIMARY_BLUE,
    borderWidth: 1 * ratio,
    borderRadius: 9 * ratio,
    padding: 20 * ratio,
    justifyContent: 'center'
  }
});