import {CHeader, CInput, CText} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import {FormikErrors, FormikProps, withFormik} from 'formik';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationInjectedProps} from 'react-navigation';
import {connect} from 'react-redux';
import {PlainAction} from 'redux-typed-actions';
import {constant} from 'pages/Home/constant';
import HTMLView from 'react-native-htmlview';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.HomeKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {};
};

interface Props extends NavigationInjectedProps {
  searchOrder: (val: any) => void;
}

interface State {}

class ListNotiComponent extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: null,
  });
  headerHeight: any;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  renderItem = (item: any) => {
    return (
      <View style={{ paddingHorizontal: 10 * ratio}}>
        <HTMLView
        value={item.description}
        stylesheet={HTMLStyles}
        addLineBreaks={false}
      />
      </View>
    )
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CHeader
          type={HEADER_TYPE.NORMAL}
          headerTitle={'Thông báo'}
          onBack={() => this.props.navigation.goBack()}
        />
        <View style={styles.listWrap}>
        <FlatList
          data={this.props.noti}
          keyExtractor={(index) => index.toString()}
          renderItem={({item}) => this.renderItem(item)}
          ItemSeparatorComponent={() => (
            <View style={{ marginHorizontal: 10 * ratio, height: 1 * ratio, backgroundColor: COLOR.DEACTIVE_GRAY }} />
          )}
        />

        </View>

      </SafeAreaView>
    );
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

const ListNotiScreen = enhancer(ListNotiComponent);

export default ListNotiScreen;

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

const HTMLStyles = StyleSheet.create({
  p: {
    fontSize: 16 * ratio,
    fontFamily: 'SourceSansPro-Regular',
    color: COLOR.DARK_BLUE,
    marginVertical: 3 * ratio,
    textAlign: 'justify'
  },
  strong: {
    fontSize: 16 * ratio,
    fontFamily: 'SourceSansPro-SemiBold',
    color: COLOR.DARK_BLUE,
    textAlign: 'justify'
  },
  text: {
    fontSize: 16 * ratio,
    fontFamily: 'SourceSansPro-SemiBold',
    color: COLOR.DARK_BLUE,
    textAlign: 'justify'
  },
});
