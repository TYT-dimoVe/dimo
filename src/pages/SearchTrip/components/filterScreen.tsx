import {CHeader, Check, CInput, CText} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import {homeState} from 'pages/Home/model';
import {searchState} from 'pages/SearchTrip/model';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {NavigationInjectedProps} from 'react-navigation';
import {connect} from 'react-redux';
import {PlainAction} from 'redux-typed-actions';
import {constant} from '../constant';
import { FilterTrips } from 'pages/Home/redux/actions';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.HomeKey] || {}),
    ...(state[constant.SearchKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    filterTrips: (val: any) => dispatch(FilterTrips.get(val)),
  };
};

export interface Props extends NavigationInjectedProps, searchState, homeState {
  filterTrips: (val: any) => void;
}

interface State {
  chooseTime: string;
  chooseBusOperator: string;
  chooseBusType: string;
  priceFrom: number;
  priceTo: number;
  showListTime: boolean;
  showListOperate: boolean;
  showListType: boolean;
}

class FilterComponent extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null,
  });
  headerHeight: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      chooseTime: this.props.timeVal,
      chooseBusOperator: this.props.busOperatorVal,
      chooseBusType: this.props.busTypeVal,
      priceFrom: this.props.priceFrom,
      priceTo: this.props.priceTo,
      showListOperate: false,
      showListTime: false,
      showListType: false,
    };
  }

  renderTime = ({item}) => {
    return (
      <View style={[styles.row, {width: '48%'}]}>
        <Check
          type={'radio'}
          color={COLOR.PRIMARY_BLUE}
          check={this.state.chooseTime === item}
          onPress={() => {
            this.setState({chooseTime: item});
          }}
        />
        <CText color={COLOR.DARK_BLUE} bold fontSize={18}>
          {item}
        </CText>
      </View>
    );
  };

  renderTimeStart = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({showListTime: !this.state.showListTime});
        }}>
        <View style={styles.viewWrap}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <CText color={COLOR.DARK_BLUE} bold fontSize={18}>
              Thời gian khởi hành
            </CText>
            <Feather
              name={this.state.showListTime ? 'chevron-up' : 'chevron-down'}
              color={COLOR.DARK_BLUE}
              size={24 * ratio}
            />
          </View>
          {this.state.showListTime && (
            <View style={{flex: 1}}>
              <FlatList
                data={this.props.listTimeStart}
                keyExtractor={(index) => index.toString()}
                renderItem={this.renderTime}
                numColumns={2}
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderOperate = ({item}) => {
    return (
      <View style={styles.row}>
        <Check
          type={'radio'}
          color={COLOR.PRIMARY_BLUE}
          check={this.state.chooseBusOperator === item.busOperatorId}
          onPress={() => {
            this.setState({chooseBusOperator: item.busOperatorId});
          }}
        />
        <CText color={COLOR.DARK_BLUE} bold fontSize={18}>
          {item.name}
        </CText>
      </View>
    );
  };

  renderBusOperator = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({showListOperate: !this.state.showListOperate});
        }}>
        <View style={styles.viewWrap}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <CText color={COLOR.DARK_BLUE} bold fontSize={18}>
              Nhà xe
            </CText>
            <Feather
              name={this.state.showListOperate ? 'chevron-up' : 'chevron-down'}
              color={COLOR.DARK_BLUE}
              size={24 * ratio}
            />
          </View>
          {this.state.showListOperate && (
            <View style={{flex: 1}}>
              <FlatList
                data={this.props.listBusOperatorId}
                keyExtractor={(index) => index.toString()}
                renderItem={this.renderOperate}
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderType = ({item}) => {
    return (
      <View style={[styles.row]}>
        <Check
          type={'radio'}
          color={COLOR.PRIMARY_BLUE}
          check={this.state.chooseBusType === item.busType}
          onPress={() => {
            this.setState({chooseBusType: item.busType});
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <CText
            style={{flexWrap: 'wrap', width: 260 * ratio}}
            color={COLOR.DARK_BLUE}
            bold
            fontSize={18}
            numberOfLines={2}>
            {item.busTypeTitle}
          </CText>
        </View>
      </View>
    );
  };

  renderBusType = () => {
    return (
      <View style={styles.viewWrap}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({showListType: !this.state.showListType});
          }}>
          <View>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <CText color={COLOR.DARK_BLUE} bold fontSize={18}>
                Loại xe
              </CText>
              <Feather
                name={this.state.showListType ? 'chevron-up' : 'chevron-down'}
                color={COLOR.DARK_BLUE}
                size={24 * ratio}
              />
            </View>
            {this.state.showListType && (
              <View style={{flex: 1}}>
                <FlatList
                  data={this.props.listBusType}
                  keyExtractor={(index) => index.toString()}
                  renderItem={this.renderType}
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  renderPrice = () => {
    return (
      <View style={[styles.viewWrap, {maxHeight: 110 * ratio}]}>
        <CText color={COLOR.DARK_BLUE} bold fontSize={18}>
          Giá từ
        </CText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 8 * ratio,
          }}>
          <CInput
            containerStyle={{
              width: '45%',
              borderRadius: 6 * ratio,
              borderColor: COLOR.PRIMARY_BLUE,
              borderWidth: 1 * ratio,
            }}
            textSize={16}
            placeholder={'Từ'}
            onChangeText={(text: number) => {
              this.setState({priceFrom: text});
            }}
            keyboardType={'numeric'}
            value={this.state.priceFrom.toString()}
          />
          <Feather
            name={'arrow-right'}
            color={COLOR.DARK_BLUE}
            size={24 * ratio}
          />
          <CInput
            containerStyle={{
              width: '45%',
              borderRadius: 6 * ratio,
              borderColor: COLOR.PRIMARY_BLUE,
              borderWidth: 1 * ratio,
            }}
            textSize={16}
            placeholder={'Đến'}
            onChangeText={(text: number) => {
              this.setState({priceTo: text});
            }}
            keyboardType={'numeric'}
            value={this.state.priceTo.toString()}
          />
        </View>
      </View>
    );
  };

  checkReset = () => {
    if (
      this.state.chooseBusOperator !== '' ||
      this.state.chooseBusType !== '' ||
      this.state.chooseTime !== '' ||
      this.state.priceFrom > 0 ||
      this.state.priceTo > 0
    ) {
      return false;
    }
    return true;
  };

  renderBtn = () => {
    return (
      <View style={[styles.row, {justifyContent: 'space-around'}]}>
        <TouchableOpacity
          disabled={this.props.isFilter === false}
          style={[
            styles.btnWrap,
            {
              backgroundColor: this.props.isFilter
                ? COLOR.PRIMARY_BLUE
                : COLOR.DEACTIVE_GRAY,
            },
          ]}
          onPress={() => {
            this.resetFilter();
          }}>
          <CText bold color={COLOR.WHITE} fontSize={20}>
            Cài lại
          </CText>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={this.checkReset()}
          style={[
            styles.btnWrap,
            {
              backgroundColor: this.checkReset()
                ? COLOR.DEACTIVE_GRAY
                : COLOR.PRIMARY_ORANGE,
            },
          ]}
          onPress={() => this.SearchFilter()}>
          <CText bold color={COLOR.WHITE} fontSize={20}>
            Lọc
          </CText>
        </TouchableOpacity>
      </View>
    );
  };

  resetFilter = () => {
    const round = this.props.navigation.getParam('round') || 1;
    this.setState({
      chooseTime: '',
      chooseBusOperator: '',
      chooseBusType: '',
      priceFrom: 0,
      priceTo: 0,
    });
    const val = {
      from: round === 1 ? this.props.pickUpCode : this.props.dropDownCode,
      to: round === 1 ? this.props.dropDownCode : this.props.pickUpCode,
      timeStart: '',
      busOperatorId: '',
      busType: '',
      isFilter: false,
    }
    this.props.filterTrips(val)
  };

  SearchFilter = () => {
    const round = this.props.navigation.getParam('round') || 1;
    const val = {
      from: round === 1 ? this.props.pickUpCode : this.props.dropDownCode,
      to: round === 1 ? this.props.dropDownCode : this.props.pickUpCode,
      priceFrom:
        this.state.priceFrom > 0 &&
        this.state.priceFrom < this.state.priceTo &&
        this.state.priceFrom || null,
      priceTo:
        this.state.priceTo > 0 &&
        this.state.priceTo > this.state.priceFrom &&
        this.state.priceTo || null,
      timeStart: this.state.chooseTime,
      busOperatorId: this.state.chooseBusOperator,
      busType: this.state.chooseBusType,
      isFilter: true,
    };
    this.props.filterTrips(val)
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CHeader
          type={HEADER_TYPE.NORMAL}
          headerTitle={'Lọc theo'}
          onBack={() => this.props.navigation.goBack()}
        />
        <ScrollView style={styles.listWrap}>
          {this.renderTimeStart()}
          {this.renderBusOperator()}
          {this.renderBusType()}
          {this.renderPrice()}
          {this.renderBtn()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

const FilterScreen = enhancer(FilterComponent);

export default FilterScreen;

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
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewWrap: {
    minHeight: 64 * ratio,
    marginHorizontal: 20 * ratio,
    marginVertical: 10 * ratio,
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
    padding: 18 * ratio,
  },
  btnWrap: {
    width: '40%',
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
    height: 45 * ratio,
    marginBottom: 36 * ratio,
  },
});
