import { CButton } from 'components';
import { WithT } from 'i18next';
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PlainAction } from 'redux-typed-actions';
import { ChangeLanguage } from 'reduxs/root/actions';
import { constant } from 'screens/theme/constant';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.RootKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    ChangeLanguage: () => dispatch(ChangeLanguage.get()),
  };
};

interface Props extends NavigationInjectedProps, WithT {}

interface States {}

class NameScreen extends Component<Props, States> {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.main}>
        <CButton title="Main" onPress={() => {}} />
      </View>
    );
  }
}

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  translate(),
);

const Screen = enhancer(NameScreen);

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
