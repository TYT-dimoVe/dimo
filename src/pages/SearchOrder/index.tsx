import { CHeader, CInput, CText } from 'components';
import { COLOR, HEADER_TYPE, ratio } from 'config/themeUtils';
import { FormikErrors, FormikProps, withFormik } from 'formik';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { PlainAction } from 'redux-typed-actions';
import { constant } from './constant';
import { SearchOrder } from './redux/actions';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.HomeKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    searchOrder: (val: any) => dispatch(SearchOrder.get(val)),
  };
};

interface Props extends NavigationInjectedProps {
  searchOrder: (val: any) => void;
}

interface State {
}

interface FormValues {
  ticketId: string;
  phoneNumber: string;
}

interface FormProps {
  ticketId: string;
  phoneNumber: string;
}

export class SearchOrderComponent extends React.Component<Props & FormikProps<FormProps>> {
  SearchOrderForm = withFormik<Props, FormValues>({
    isInitialValid: false,
    mapPropsToValues: () => {
      return {
        ticketId: '',
        phoneNumber: ''
      };
    },
    validate: (values: FormValues) => {
      const errors: FormikErrors<FormValues> = {};
      
      if (!values.ticketId) {
        errors.ticketId = 'Vui lòng nhập mã vé'
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = 'Vui lòng nhập số điện thoại'
      }
      if (values.phoneNumber !== '' &&
        (!values.phoneNumber.match(/^((09|03|07|08|05)+([0-9]{8})\b)$/) &&
          !values.phoneNumber.match(/^((\+8)+([0-9]{10})\b)$/))
      ) {
        errors.phoneNumber = 'Số điện thoại không hợp lệ!';
      }
      return errors;
    },
    handleSubmit: (values) => {
      const val = {
        search: values.ticketId,
        phoneNumber: values.phoneNumber,
      }
      this.props.searchOrder(val);
    },
  })((props) => {
    const formValid = props.isValid;
    return (
      <KeyboardAwareScrollView
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}>
          <View style={styles.viewWrap}>
          <CText bold fontSize={18} color={COLOR.DARK_BLUE}>Mã vé</CText>
          <CInput
          style={styles.containerInput}
          placeholder={'Nhập mã vé'}
          value={props.values.ticketId}
          textError={props.errors.ticketId}
          onChangeText={(text: string) => props.handleChange('ticketId')(text)}
          textSize={18}
        />
        <CText bold fontSize={18} color={COLOR.DARK_BLUE}>Số điện thoại</CText>
          <CInput
          keyboardType={'phone-pad'}
          style={styles.containerInput}
          placeholder={'Nhập số điện thoại'}
          value={props.values.phoneNumber}
          textError={props.errors.phoneNumber}
          onChangeText={(text: string) => props.handleChange('phoneNumber')(text)}
          textSize={18}
        />
          </View>
          <TouchableOpacity
          style={[styles.btnWrap, { backgroundColor: formValid ? COLOR.PRIMARY_ORANGE : COLOR.DEACTIVE_GRAY}]}
          onPress={
            // () => { formValid && props.handleSubmit()}
            () => { formValid && props.handleSubmit()}
          }
          >
          <CText bold color={COLOR.WHITE} fontSize={20}>
            Tìm vé
          </CText>
        </TouchableOpacity>
          </KeyboardAwareScrollView>
    )
  })
  render() {
    return (
      <View style={styles.container}>
        <CHeader type={HEADER_TYPE.NORMAL} headerTitle={'Tra cứu'} onBack={() => this.props.navigation.goBack()} />
        <View style={styles.listWrap}>
          <this.SearchOrderForm {...this.props.values} />
        </View>
      </View>
    );
  }
}

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps,
)

const SearchOrderScreen = enhancer(SearchOrderComponent);

export default SearchOrderScreen;

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
    padding: 15 * ratio,
  },
  containerInput: {
    marginVertical: 8 * ratio,
    borderWidth: 1 * ratio,
    borderRadius: 9 * ratio,
    borderColor: COLOR.DEACTIVE_GRAY,
    height: 64 * ratio,
    alignItems: 'center',
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
});