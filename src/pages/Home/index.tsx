import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { PlainAction } from 'redux-typed-actions';
import { constant } from './constant';
import { HEADER_TYPE, ratio, COLOR } from 'config/themeUtils';
import { CHeader } from 'components';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.RootKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
  };
};

export interface Props extends NavigationInjectedProps {
  test: boolean;
}

interface State { }

class HomeComponent extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null,
  });
  headerHeight: any;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { test } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <CHeader type={HEADER_TYPE.MAIN} viewNoti={() => console.info('View noti')} searchOrder={() => console.info('Search order')}/>
        <View style={styles.listWrap}>

        </View>
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
    paddingTop: 30 * ratio,
  }
});