import React, { Component } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleProp,
  TextStyle,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ratio } from 'config/themeUtils';
import { convertNumber, formatCurrency, reConvertMoney } from 'utils/function';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
  textSize?: number;
  placeholder?: string;
  secureTextEntry?: boolean;
  value: string;
  keyboardType?: any;
  placeholderTextColor?: string;
  textColor?: string;
  backgroundColor?: string;
  multiline?: boolean;
  type?: string;
  editable?: boolean;
  autoFocus?: boolean;
  containerStyle?: any;
  onPress?: any;
  onFocus?: any;
  onBlur?: any;
  onChangeText: any;
  showIcon?: boolean;
  textError?: any;
  rightIcon?: any;
  style: any;
  onSubmitEditing?: any;
  onPressRightIcon?: any;
  textInputStyle?: StyleProp<TextStyle>;
}

interface States {
  secureTextEntryState: boolean;
  textValue: any;
  autoFocus: boolean;
}

class TextInputScreen extends Component<Props, States> {
  static defaultProps = {
    containerStyle: {},
    style: {},
    showIcon: false,
    value: '',
    placeholder: '',
    textSize: 12,
    secureTextEntry: false,
    keyboardType: 'default',
    placeholderTextColor: 'gray',
    textColor: 'black',
    backgroundColor: 'white',
    textError: '',
    multiline: false,
    autoFocus: false,
    rightIcon: null,
    type: 'default',
    editable: true,
    onPress: () => { },
    onFocus: () => { },
    onBlur: () => { },
    onChangeText: () => { },
    onSubmitEditing: () => { },
    onPressRightIcon: () => { },
    textInputStyle: {},
  };

  textInput: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      secureTextEntryState: this.props.secureTextEntry,
      textValue: this.props.value || '',
      autoFocus: this.props.autoFocus,
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.state.textValue !== nextProps.value) {
      this.setState({ textValue: nextProps.value || '' });
    }
  }

  focus = () => {
    if (this.props.editable) {
      return this.textInput.focus();
    }

    this.props.onPress(this.state.textValue);
  };

  onChangeText = (text: string) => {
    if (this.props.type === 'default') {
      this.setState({ textValue: text });
      this.props.onChangeText(text);
    } else {
      this.setState({ textValue: formatCurrency(Number(text)) });
      this.props.onChangeText(reConvertMoney(text));
    }
  };

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  onPressText = () => {
    this.textInput.clear();
    this.props.onChangeText('');
    this.setState({ textValue: '' });
  };

  onPressPassword = () => {
    this.setState({ secureTextEntryState: !this.state.secureTextEntryState });
  };

  onPressRightIcon = () => {
    this.props.onPressRightIcon();
  };
  render() {
    const {
      backgroundColor,
      editable,
      style,
      textError,
      type,
      placeholder,
      textSize,
      textColor,
      keyboardType,
      placeholderTextColor,
      multiline,
      onFocus,
      onBlur,
      showIcon,
      secureTextEntry,
      rightIcon,
      onSubmitEditing,
      textInputStyle,
    } = this.props;
    return (
      <View style={this.props.containerStyle}>
        <TouchableWithoutFeedback onPress={this.focus}>
          <View
            style={[
              styles.container,
              style,
              { backgroundColor: editable ? backgroundColor : '#F5F5F5' },
              textError.length > 0 && { marginBottom: 10 },
              multiline && { alignItems: 'flex-start' },
            ]}>
            {type === 'money' && this.state.textValue.length > 0 && <Text style={styles.price} />}
            {!editable ? (
              <Text
                style={[styles.textInput, this.state.textValue.length === 0 && { color: 'gray' }]}>
                {type === 'default'
                  ? this.state.textValue.length > 0
                    ? this.state.textValue
                    : placeholder
                  : formatCurrency(this.state.textValue)}
              </Text>
            ) : (
                <TextInput
                  style={[
                    styles.textInput,
                    { color: textColor, fontSize: textSize * ratio, paddingVertical: 0 },
                    textInputStyle,
                  ]}
                  keyboardType={keyboardType}
                  onChangeText={this.onChangeText}
                  underlineColorAndroid={'transparent'}
                  autoCapitalize={'none'}
                  returnKeyType={'done'}
                  placeholder={placeholder}
                  placeholderTextColor={placeholderTextColor}
                  value={
                    type === 'money'
                      ? formatCurrency(this.state.textValue)
                      : type === 'number'
                        ? convertNumber(this.state.textValue)
                        : this.state.textValue
                  }
                  secureTextEntry={this.state.secureTextEntryState}
                  ref={(input) => {
                    this.textInput = input;
                  }}
                  multiline={multiline}
                  onSubmitEditing={onSubmitEditing}
                  autoFocus={this.state.autoFocus}
                  autoCorrect={false}
                  editable={editable}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              )}
            {showIcon &&
              secureTextEntry === false &&
              rightIcon === null &&
              (this.state.textValue.length > 0 && (
                <TouchableWithoutFeedback onPress={() => this.onChangeText('')} style={styles.icon}>
                  <AntDesign
                    color={backgroundColor === 'white' ? 'gray' : 'gray'}
                    name="ios-close"
                    size={20 * ratio}
                  />
                </TouchableWithoutFeedback>
              ))}
            {showIcon && secureTextEntry === true && rightIcon === null && (
              <TouchableWithoutFeedback onPress={this.onPressPassword} style={styles.icon}>
                <Feather
                  name={this.state.secureTextEntryState ? 'ic-password-hide' : 'ic-password-show'}
                  color={'#888888'}
                  size={20 * ratio}
                />
              </TouchableWithoutFeedback>
            )}
            {showIcon && rightIcon !== null && (
              <TouchableWithoutFeedback onPress={this.onPressRightIcon} style={styles.icon}>
                <Feather name={rightIcon} size={20 * ratio} color={'#70777E'} />
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
        {textError.length > 0 && <Text style={styles.error}>{textError}</Text>}
      </View>
    );
  }
}

export default TextInputScreen;

const styles = StyleSheet.create({
  container: {
    height: 45 * ratio,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 6 * ratio,
    alignItems: 'center',
    paddingHorizontal: 10 * ratio,
    paddingVertical: 0,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 9 * ratio,
    fontSize: 14 * ratio,
    color: 'black',
    fontFamily: 'SourceSansPro-Regular',
  },
  icon: {
    width: 25 * ratio,
    height: 25 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    width: 20 * ratio,
    height: 20 * ratio,
    // backgroundColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 12 * ratio,
    fontFamily: 'SourceSansPro-Regular',
  },
  row: {
    maxHeight: 60 * ratio,
  },
  price: {
    fontSize: 14 * ratio,
  },
});
