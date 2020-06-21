import {CHeader, CText} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import {searchState} from 'pages/SearchTrip/model';
import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {NavigationInjectedProps} from 'react-navigation';
import {connect} from 'react-redux';
import {PlainAction} from 'redux-typed-actions';
import {convertMoney} from 'utils/function';
import {constant} from './constant';
import {SaveSeats} from './redux/actions';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.SearchKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    saveSeat: (val: any) => dispatch(SaveSeats.get(val)),
  };
};

interface Props extends NavigationInjectedProps, searchState {
  floor1: any[];
  floor2: any[];
  column: number;
  row: number;
  saveSeat: (val: any) => void;
}

interface State {
  floor1: any[];
  floor2: any[];
  seats: any[];
}

export class ChooseSeatComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      floor1: this.props.floor1,
      floor2: this.props.floor2,
      seats: [],
    };
  }

  renderSeatItem = (item: any, id: any, floor: number) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {item.length > 0 &&
          item.map((seat: any, index: any) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  seat && !seat.status && this.chooseSeat(id, index, floor);
                }}
                key={seat?.seatId}>
                <View
                  style={
                    seat
                      ? seat?.status
                        ? styles.choosedseatWrap
                        : seat.isChoosing
                        ? styles.isChoosingseatWrap
                        : styles.notChooseseatWrap
                      : styles.nullSeat
                  }
                  key={seat?.seatId}
                />
              </TouchableWithoutFeedback>
            );
          })}
      </View>
    );
  };

  chooseSeat = (row: number, col: number, floor: number) => {
    if (floor === 1) {
      let data = this.state.floor1;
      data[row][col].isChoosing = !this.state.floor1[row][col].isChoosing;
      this.setState({floor1: data}, () => {
        if (this.state.floor1[row][col].isChoosing === true) {
          this.setState(
            {seats: [...this.state.seats, this.state.floor1[row][col]?.seatId]},
            () => console.info(this.state.seats),
          );
        } else {
          const preSeats = this.state.seats;
          const index = preSeats.indexOf(this.state.floor1[row][col].seatId);
          preSeats.splice(index, 1);
          this.setState({seats: preSeats}, () =>
            console.info(this.state.seats),
          );
        }
      });
    } else if (floor === 2) {
      let data = this.state.floor2;
      data[row][col].isChoosing = !this.state.floor2[row][col].isChoosing;
      this.setState({floor2: data}, () => {
        if (this.state.floor2[row][col].isChoosing === true) {
          this.setState(
            {seats: [...this.state.seats, this.state.floor2[row][col]?.seatId]},
            () => console.info(this.state.seats),
          );
        } else {
          const preSeats = this.state.seats;
          const index = preSeats.indexOf(this.state.floor2[row][col].seatId);
          preSeats.splice(index, 1);
          this.setState({seats: preSeats}, () =>
            console.info(this.state.seats),
          );
        }
      });
    }
  };

  renderSeat = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {this.state.floor1?.length > 0 && (
          <View style={styles.floorWrap} key={'floor1'}>
            <CText
              bold
              color={COLOR.DARK_BLUE}
              fontSize={16}
              style={{alignSelf: 'center'}}>
              TẦNG 1
            </CText>
            <FlatList
              data={this.state.floor1}
              keyExtractor={(index) => index.toString()}
              renderItem={({item, index}) =>
                this.renderSeatItem(item, index, 1)
              }
              contentContainerStyle={{
                flexDirection: 'column',
                marginTop: 5 * ratio,
              }}
            />
          </View>
        )}
        {this.state.floor2?.length > 0 && (
          <View style={styles.floorWrap} key={'floor2'}>
            <CText
              bold
              color={COLOR.DARK_BLUE}
              fontSize={16}
              style={{alignSelf: 'center'}}>
              TẦNG 2
            </CText>
            <FlatList
              data={this.state.floor2}
              keyExtractor={(index) => index.toString()}
              renderItem={({item, index}) =>
                this.renderSeatItem(item, index, 2)
              }
              contentContainerStyle={{
                flexDirection: 'column',
                marginTop: 5 * ratio,
              }}
            />
          </View>
        )}
      </View>
    );
  };

  renderType = () => {
    return (
      <View
        style={[
          styles.row,
          {margin: 16 * ratio, justifyContent: 'space-between'},
        ]}>
        <View style={styles.row}>
          <View style={[styles.isChoosingseatWrap, styles.typeWrap]} />
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Ghế đang chọn
          </CText>
        </View>
        <View style={styles.row}>
          <View style={[styles.choosedseatWrap, styles.typeWrap]} />
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Ghế đã đặt
          </CText>
        </View>
        <View style={styles.row}>
          <View style={[styles.notChooseseatWrap, styles.typeWrap]} />
          <CText bold color={COLOR.DARK_BLUE} fontSize={16}>
            Ghế trống
          </CText>
        </View>
      </View>
    );
  };

  renderInfo = () => {
    const price =
      this.props.round === 1
        ? this.props.round1.price
        : this.props.round2.price;
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
              {this.state.seats.map((seat, index) => {
                return (
                  <CText bold fontSize={16} color={COLOR.PRIMARY_ORANGE}>
                    {seat}
                    {index === this.state.seats.length - 1 ? '' : ', '}
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
              {convertMoney(this.state.seats.length * price)}
            </CText>
          </View>
        </View>
      </View>
    );
  };

  renderBtn = () => {
    return (
      <TouchableOpacity
        disabled={this.state.seats.length < 1}
        style={[
          styles.btnWrap,
          {
            backgroundColor:
              this.state.seats.length < 1
                ? COLOR.DEACTIVE_GRAY
                : COLOR.PRIMARY_ORANGE,
          },
        ]}
        onPress={() => this.saveSeat()}>
        <CText bold color={COLOR.WHITE} fontSize={20}>
          Tiếp tục
        </CText>
      </TouchableOpacity>
    );
  };

  saveSeat = () => {
    const {round} = this.props;
    const price =
      round === 1 ? this.props.round1.price : this.props.round2.price;
    let val = {};
    if (round === 1) {
      val = {
        round: round,
        seatRound1: {
          seats: this.state.seats,
          totalPrice: this.state.seats.length * price,
        },
      };
    } else {
      val = {
        round: round,
        seatRound2: {
          seats: this.state.seats,
          totalPrice: this.state.seats.length * price,
        },
      };
    }

    this.props.saveSeat(val);
    this.props.navigation.navigate('Transhipment');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CHeader
          type={HEADER_TYPE.NORMAL}
          headerTitle={'Chọn vị trí'}
          onBack={() => this.props.navigation.goBack()}
        />
        <View style={styles.listWrap}>
          <ScrollView style={{flex: 1}}>
            {this.renderSeat()}
            {this.renderType()}
            <View style={styles.separateLine} />
            {this.renderInfo()}
            {this.renderBtn()}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

const ChooseSeatScreen = enhancer(ChooseSeatComponent);

export default ChooseSeatScreen;

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
    height: 45 * ratio,
    marginBottom: 36 * ratio,
  },
  separateLine: {
    height: 8 * ratio,
    backgroundColor: COLOR.LIGHT_GRAY,
  },
  notChooseseatWrap: {
    margin: 2 * ratio,
    width: 30 * ratio,
    height: 40 * ratio,
    borderTopLeftRadius: 9 * ratio,
    borderTopRightRadius: 9 * ratio,
    borderWidth: 2 * ratio,
    borderColor: COLOR.DARK_BLUE,
    backgroundColor: COLOR.WHITE,
  },
  choosedseatWrap: {
    margin: 2 * ratio,
    width: 30 * ratio,
    height: 40 * ratio,
    borderTopLeftRadius: 9 * ratio,
    borderTopRightRadius: 9 * ratio,
    borderWidth: 2 * ratio,
    borderColor: COLOR.PRIMARY_BLUE,
    backgroundColor: COLOR.PRIMARY_BLUE,
  },
  isChoosingseatWrap: {
    margin: 2 * ratio,
    width: 30 * ratio,
    height: 40 * ratio,
    borderTopLeftRadius: 9 * ratio,
    borderTopRightRadius: 9 * ratio,
    borderWidth: 2 * ratio,
    borderColor: COLOR.PRIMARY_ORANGE,
    backgroundColor: COLOR.PRIMARY_ORANGE,
  },
  nullSeat: {
    margin: 2 * ratio,
    width: 30 * ratio,
    height: 40 * ratio,
  },
  floorWrap: {
    flex: 0.5,
    marginHorizontal: 2 * ratio,
    backgroundColor: COLOR.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 4 * ratio,
      height: 3 * ratio,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2 * ratio,
    // alignItems: 'center',
    padding: 5 * ratio,
    borderRadius: 6 * ratio,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  typeWrap: {
    width: 16 * ratio,
    height: 16 * ratio,
    paddingRight: 5 * ratio,
    borderTopLeftRadius: 4 * ratio,
    borderTopRightRadius: 4 * ratio,
    borderRadius: 4 * ratio,
  },
});
