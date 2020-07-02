import {CHeader, CInput, CText} from 'components';
import {COLOR, HEADER_TYPE, ratio} from 'config/themeUtils';
import {FormikErrors, FormikProps, withFormik} from 'formik';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationInjectedProps} from 'react-navigation';
import {connect} from 'react-redux';
import {PlainAction} from 'redux-typed-actions';
import {constant} from '../constant';
import { SaveCustomerInfo } from '../redux/actions';
import { validateEmail } from 'utils/function';

const mapStateToProps = (state: any) => {
  return {
    ...(state[constant.HomeKey] || {}),
  };
};

const mapDispatchToProps = (dispatch: (action: PlainAction) => void) => {
  return {
    saveCustomerInfo: (val: any) => dispatch(SaveCustomerInfo.get(val)),
  };
};

interface Props extends NavigationInjectedProps {
  saveCustomerInfo: (val: any) => void;
}

interface State {}

interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  id: string;
}

interface FormProps {
  name: string;
  email: string;
  phoneNumber: string;
  id: string;
}

export class InformationComponent extends React.Component<
  Props & FormikProps<FormProps>
> {
  InformationForm = withFormik<Props, FormValues>({
    isInitialValid: false,
    mapPropsToValues: () => {
      return {
        name: '',
        email: '',
        phoneNumber: '',
        id: '',
      };
    },
    validate: (values: FormValues) => {
      const errors: FormikErrors<FormValues> = {};

      if (!values.name) {
        errors.name = 'Vui lòng nhập Họ và Tên';
      }

      if (!values.phoneNumber) {
        errors.phoneNumber = 'Vui lòng nhập số điện thoại';
      }
      if (
        values.phoneNumber !== '' &&
        !values.phoneNumber.match(/^((09|03|07|08|05)+([0-9]{8})\b)$/) &&
        !values.phoneNumber.match(/^((\+8)+([0-9]{10})\b)$/)
      ) {
        errors.phoneNumber = 'Số điện thoại không hợp lệ!';
      }
      // if (!values.email) {
      //   errors.email = 'Vui lòng nhập email'
      // }
      if (values.email !== '' &&
        !(validateEmail(values.email))) {
        errors.email = 'Email không hợp lệ!';
      }
      if (!values.id) {
        errors.id = 'Vui lòng nhập CMND/CCCD';
      }

      return errors;
    },
    handleSubmit: (values) => {
      const val = {
        customerName: values.name,
        phoneNumber: values.phoneNumber,
        identityId: values.id,
        customerEmail: values.email,
      };
      this.props.saveCustomerInfo(val)
      this.props.navigation.navigate('Confirm')
    },
  })((props) => {
    const formValid = props.isValid;
    return (
      <KeyboardAwareScrollView
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.viewWrap}>
          <CText bold fontSize={18} color={COLOR.DARK_BLUE}>
            Họ và tên
          </CText>
          <CInput
            style={styles.containerInput}
            placeholder={'Vd: Nguyễn Văn A'}
            value={props.values.name}
            textError={props.touched.name && props.errors.name}
            onChangeText={(text: string) => props.handleChange('name')(text)}
            textSize={18}
          />
          <CText bold fontSize={18} color={COLOR.DARK_BLUE}>
            Số điện thoại
          </CText>
          <CInput
            keyboardType={'phone-pad'}
            style={styles.containerInput}
            placeholder={'Vd: 090XXXXXXX'}
            value={props.values.phoneNumber}
            textError={props.errors.phoneNumber}
            onChangeText={(text: string) =>
              props.handleChange('phoneNumber')(text)
            }
            textSize={18}
          />
          <CText bold fontSize={18} color={COLOR.DARK_BLUE}>
            CMND/CCCD
          </CText>
          <CInput
            keyboardType={'number-pad'}
            style={styles.containerInput}
            placeholder={'Vd: XXXXXXXXX'}
            value={props.values.id}
            textError={props.errors.id}
            onChangeText={(text: string) => props.handleChange('id')(text)}
            textSize={18}
          />
          <CText bold fontSize={18} color={COLOR.DARK_BLUE}>
            Email
          </CText>
          <CInput
          keyboardType={'email-address'}
            style={styles.containerInput}
            placeholder={'Vd: example@email.com'}
            value={props.values.email}
            textError={props.errors.email}
            onChangeText={(text: string) => props.handleChange('email')(text)}
            textSize={18}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.btnWrap,
            {
              backgroundColor: formValid
                ? COLOR.PRIMARY_ORANGE
                : COLOR.DEACTIVE_GRAY,
            },
          ]}
          onPress={() => {
            formValid && props.handleSubmit();
          }}>
          <CText bold color={COLOR.WHITE} fontSize={20}>
            Tiếp tục
          </CText>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  });
  render() {
    return (
      <View style={styles.container}>
        <CHeader
          type={HEADER_TYPE.NORMAL}
          headerTitle={'Thông tin cá nhân'}
          onBack={() => this.props.navigation.goBack()}
        />
        <View style={styles.listWrap}>
          <this.InformationForm {...this.props.values} />
        </View>
      </View>
    );
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

const InformationScreen = enhancer(InformationComponent);

export default InformationScreen;

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
