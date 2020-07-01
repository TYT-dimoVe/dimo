import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ratio } from 'config/themeUtils';

export interface Props {
  check: boolean;
  style: any;
  size: number;
  onPress: any;
  type: 'checkbox' | 'radio';
  color?: string;
}

interface State {
  check: boolean;
}

class ComponentName extends React.Component<Props, State> {
  static defaultProps = {
    check: false,
    style: {},
    size: 20,
    type: 'checkbox',
    color: 'black',
    onPress: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      check: this.props.check,
    };
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.check !== this.props.check) {
      this.setState({ check: this.props.check });
    }
  }

  onChange = () => {
    // this.setState({ check: !this.state.check });
    this.props.onPress(this.state.check);
  };

  render() {
    const { style, size, type, color } = this.props;
    const { check } = this.state;
    return (
      <TouchableWithoutFeedback onPress={this.onChange}>
        <View style={[styles.container, style]}>
          <MaterialCommunityIcons
            style={style}
            size={size * ratio}
            color={color}
            name={
              check
                ? type === 'checkbox'
                  ? 'checkbox-marked-outline'
                  : 'radiobox-marked'
                : type === 'checkbox'
                ? 'checkbox-blank-outline'
                : 'radiobox-blank'
            }
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ComponentName;

const styles = StyleSheet.create({
  container: {
    padding: 10 * ratio,
  },
});
