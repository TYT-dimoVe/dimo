import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import {COLOR, ratio} from 'config/themeUtils';

interface Props {
  fontSize?: number;
  bold?: boolean;
  color?: string;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  touch?: boolean;
  onPress?: any;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
}
interface States {}

class TextComponent extends PureComponent<Props, States> {
  static propTypes = {
    style: PropTypes.object,
    fontSize: PropTypes.number,
    bold: PropTypes.bool,
    color: PropTypes.string,
  };

  static defaultProps = {
    style: {},
    fontSize: 12,
    bold: false,
    touch: false,
    h1: false,
    h2: false,
    h3: false,
    color: COLOR.TEXT_DEFAULT,
    onPress: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      touch,
      numberOfLines,
      onPress,
      fontSize,
      h1,
      h2,
      h3,
      bold,
      color,
      style,
      children,
    } = this.props;
    if (touch) {
      if (numberOfLines) {
        return (
          <TouchableWithoutFeedback onPress={onPress}>
            <Text
              style={[
                styles.text,
                fontSize && {fontSize: fontSize * ratio},
                h1 && {fontSize: 16 * ratio},
                h2 && {fontSize: 14 * ratio},
                h3 && {fontSize: 12 * ratio},
                bold && {fontWeight: 'bold'},
                color && {color: color},
                style,
              ]}
              numberOfLines={numberOfLines}>
              {children}
            </Text>
          </TouchableWithoutFeedback>
        );
      } else {
        return (
          <TouchableWithoutFeedback onPress={onPress}>
            <Text
              style={[
                styles.text,
                fontSize && {fontSize: fontSize * ratio},
                bold && {fontWeight: 'bold'} && { fontFamily: 'SourceSansPro-SemiBold'},
                color && {color: color},
                style,
              ]}>
              {children}
            </Text>
          </TouchableWithoutFeedback>
        );
      }
    } else {
      if (numberOfLines) {
        return (
          <Text
            style={[
              styles.text,
              fontSize && {fontSize: fontSize * ratio},
              bold && {fontWeight: 'bold'} && { fontFamily: 'SourceSansPro-SemiBold'},
              color && {color: color},
              style,
            ]}
            numberOfLines={numberOfLines}>
            {children}
          </Text>
        );
      } else {
        return (
          <Text
            style={[
              styles.text,
              fontSize && {fontSize: fontSize * ratio},
              bold && {fontWeight: 'bold'} && { fontFamily: 'SourceSansPro-SemiBold'},
              color && {color: color},
              style,
            ]}>
            {children}
          </Text>
        );
      }
    }
  }
}

export default TextComponent;

const styles = StyleSheet.create({
  text: {
    color: COLOR.TEXT_DEFAULT,
    fontFamily: 'SourceSansPro-Regular',
  },
});
