import { CHeader } from 'components';
import { COLOR, HEADER_TYPE, ratio } from 'config/themeUtils';
import moment from 'moment';
import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { PlainAction } from 'redux-typed-actions';
import { constant } from './constant';
import { homeState } from './model';
import { GetCities, SaveRoundTrip, SearchTrips } from './redux/actions';
import TripItem from './components/tripItem';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.HomeKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    searchTrips: (val: any) => dispatch(SearchTrips.get(val)),
  };
};

export interface Props extends NavigationInjectedProps, homeState {
  getCities: () => void;
  searchData: any;
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
      startCalendarVisible: false,
      isRoundTrip: false,
      endDatePick: moment(this.tomorow).format('DD/MM/YYYY'),
      endCalendarVisible: false,
      endDate: this.tomorow,
    };
  }

  componentDidMount() {
  }

  renderItem = ({item}: any) => {
    return (
      <TripItem item={item} />
    )
  }

  render() {
    const { cities } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <CHeader type={HEADER_TYPE.INFO} pickup={this.props.pickUpCity} dropdown={this.props.dropDownCity} headerSubTitle={this.props.date}/>
        <View style={styles.listWrap}>
          <FlatList data={this.props.searchData} renderItem={this.renderItem} keyExtractor={(item, index) => index.toString()} />
        </View>
      </SafeAreaView>
    );
  }
}

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps,
)

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
});