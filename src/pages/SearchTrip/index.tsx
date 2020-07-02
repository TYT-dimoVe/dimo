import {CHeader, CText} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import moment from 'moment';
import {homeState} from 'pages/Home/model';
import {
  LoadMoreTrips,
  ResetFilter,
  SearchTrips,
} from 'pages/Home/redux/actions';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NavigationInjectedProps} from 'react-navigation';
import {connect} from 'react-redux';
import {PlainAction} from 'redux-typed-actions';
import TripItem from './components/tripItem';
import {constant} from './constant';
import {GetFilter, GetSeat} from './redux/actions';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.HomeKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    searchTrips: (val: any) => dispatch(SearchTrips.get(val)),
    getFilter: (val: any) => dispatch(GetFilter.get(val)),
    getSeat: (val: any) => dispatch(GetSeat.get(val)),
    loadMoreTrips: (val: any) => dispatch(LoadMoreTrips.get(val)),
    resetFilter: (val: any) => dispatch(ResetFilter.get(val)),
  };
};

export interface Props extends NavigationInjectedProps, homeState {
  getCities: () => void;
  searchData: any;
  searchTrips: (val: any) => void;
  getFilter: (val: any) => void;
  getSeat: (val: any) => void;
  loadMoreTrips: (val: any) => void;
  resetFilter: (val: any) => void;
}

interface State {
  pickUpCity: string;
  dropdownCity: string;
  pickUpCode: string;
  dropdownCode: string;
  startDatePick: string;
}

class SearchTripsComponent extends React.Component<Props, State> {
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
    };
  }

  componentDidMount() {
    this.resetFilter();
  }

  resetFilter = () => {
    const val = {
      isFilter: false,
    };
    this.props.resetFilter(val);
  };

  renderItem = ({item}: any) => {
    return (
      <TripItem
        item={item}
        onPress={(item) => {
          this.getSeat(item);
        }}
      />
    );
  };

  getSeat = (item: any) => {
    const round = this.props.navigation.getParam('round') || 1;
    let val = {};
    if (round === 1) {
      val = {
        round: 1,
        round1: {
          busType: item.busType,
          tripId: item.tripId,
          date: this.props.date,
          pickUp: item.pickUp,
          timeStart: item.timeStart,
          price: item.price,
          busOperator: item.busOperator,
          busOperatorId: item.busOperatorId,
        },
      };
    } else {
      val = {
        round: 2,
        round2: {
          busType: item.busType,
          tripId: item.tripId,
          date: this.props.date,
          pickUp: item.pickUp,
          timeStart: item.timeStart,
          price: item.price,
          busOperator: item.busOperator,
          busOperatorId: item.busOperatorId,
        },
      };
    }

    this.props.getSeat(val);
  };

  getFilter = () => {
    const round = this.props.navigation.getParam('round') || 1;
    const val = {
      from: round === 1 ? this.props.pickUpCode : this.props.dropDownCode,
      to: round === 1 ? this.props.dropDownCode : this.props.pickUpCode,
      round: round,
    };
    this.props.getFilter(val);
  };

  searchTrips = (date: string) => {
    const round = this.props.navigation.getParam('round') || 1;
    const searchVal = {
      from: round === 1 ? this.props.pickUpCode : this.props.dropDownCode,
      to: round === 1 ? this.props.dropDownCode : this.props.pickUpCode,
      date: date,
      page: 1,
      round: round,
    };

    this.props.searchTrips(searchVal);
  };

  loadMoreTrips = () => {
    const round = this.props.navigation.getParam('round') || 1;
    const searchVal = {
      from: round === 1 ? this.props.pickUpCode : this.props.dropDownCode,
      to: round === 1 ? this.props.dropDownCode : this.props.pickUpCode,
      date: this.props.date,
      page: this.props.page + 1,
    };

    this.props.loadMoreTrips(searchVal);
  };

  render() {
    const round = this.props.navigation.getParam('round') || 1;
    return (
      <View style={styles.container}>
        <CHeader
          type={HEADER_TYPE.INFO}
          pickup={round === 1 ? this.props.pickUpCity : this.props.dropDownCity}
          dropdown={
            round === 1 ? this.props.dropDownCity : this.props.pickUpCity
          }
          headerSubtitle={this.props.date}
          onBack={() => this.props.navigation.goBack()}
          onLeftPress={() => {
            const previousDate = moment(moment(this.props.date, 'DD/MM/YYYY'))
              .add(-1, 'days')
              .format('DD/MM/YYYY');
            moment(previousDate, 'DD/MM/YYYY') < moment() || round === 2 && moment(previousDate, 'DD/MM/YYYY') <= moment(moment(this.props.round1Date, 'DD/MM/YYYY'))
              ? console.info('false')
              : this.searchTrips(previousDate);
          }}
          onRightPress={() => {
            const nextDate = moment(moment(this.props.date, 'DD/MM/YYYY'))
              .add(1, 'days')
              .format('DD/MM/YYYY');
            moment(nextDate, 'DD/MM/YYYY') > moment(this.maxDate) || this.props.isRoundTrip && round === 1 && moment(nextDate, 'DD/MM/YYYY') >= moment(moment(this.props.roundTripDate, 'DD/MM/YYYY'))
              ? console.info('false')
              : this.searchTrips(nextDate);
          }}
        />
        <View style={styles.listWrap}>
          <View style={{paddingBottom: 10 * ratio}}>
            <TouchableOpacity
              activeOpacity={0.95}
              style={styles.filterBtnWrap}
              onPress={() => this.getFilter()}>
              <FontAwesome
                name={'filter'}
                color={COLOR.DEACTIVE_GRAY}
                size={24 * ratio}
              />
              <CText bold color={'#616167'} fontSize={16}>
                Lọc theo
              </CText>
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.props.searchData}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => {
              this.props.isFilter === false && this.loadMoreTrips();
            }}
          />
        </View>
      </View>
    );
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

const SearchTripScreen = enhancer(SearchTripsComponent);

export default SearchTripScreen;

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
  filterBtnWrap: {
    flexDirection: 'row',
    marginLeft: 20 * ratio,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10 * ratio,
    paddingVertical: 8 * ratio,
    width: 120 * ratio,
    height: 40 * ratio,
    borderRadius: 9 * ratio,
    shadowColor: '#000',
    shadowOffset: {
      width: -1 * ratio,
      height: 4 * ratio,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 0.7 * ratio,
  },
});
