import React, { Component } from 'react';
import { View, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';
import { Dropdown, DropDownData } from 'react-native-material-dropdown';
import { CText } from 'components';
import { ratio, COLOR } from 'config/themeUtils';
import Feather from 'react-native-vector-icons/Feather'

interface Props {
  data: DropDownData[];
  label?: string;
  onChange: (value: string, index: number, data: DropDownData[]) => void;
  value?: any;
  containerStyle?: StyleProp<ViewStyle> | {};
  renderLabel?: (val: string) => string;
}

export default class Spinner extends Component<Props, {}> {
  
  constructor(props: Props) {
    super(props);
  }

  renderBaseComponent = (props: any) => {
    const { label, value } = props;

    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={styles.content}>
          <View style={styles.group1}>
            <CText bold style={styles.value}>
              {value ? (this.props.renderLabel ? this.props.renderLabel(value) : value) : label}
            </CText>
          </View>
          <View style={styles.group2}>
            <Feather size={12} color={COLOR.DARK_BLUE} name={'chevron-down'} />
          </View>
        </View>
      </View>
    );
  };
  render() {
    const { label, onChange, data } = this.props;
    return (
      <Dropdown
        value={this.props.value}
        itemPadding={20 * ratio}
        data={data}
        label={label || ''}
        onChangeText={onChange}
        rippleInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
        renderBase={this.renderBaseComponent}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 9 * ratio,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    marginHorizontal: 16 * ratio,
  },
  group1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  icon: {
    width: 12,
    height: 6,
  },
  value: {
    color: COLOR.DARK_BLUE,
    lineHeight: 20,
    fontSize: 16 * ratio,
  },
  group2: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
