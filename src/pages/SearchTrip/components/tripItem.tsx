import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PlainAction } from 'redux-typed-actions';
import { constant } from '../constant';
import { ratio, COLOR } from 'config/themeUtils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { CText } from 'components';
import { formatCurrency } from 'utils/function';

export interface Props extends NavigationInjectedProps {
    item: any;
    onPress: (item: any) => void;
}

interface State { }

class TripItem extends React.Component<Props, State> {
    static navigationOptions = () => ({
        header: null,
    });
    headerHeight: any;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(item)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 0.8}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name={'bus'} size={20 * ratio} color={COLOR.DARK_BLUE} style={{ marginRight: 5 * ratio }} />
                            <CText bold color={COLOR.PRIMARY_BLUE} fontSize={16}>Nhà xe {item.busOperator}</CText>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 * ratio }} >
                            <MaterialIcons name={'location-on'} size={20 * ratio} color={COLOR.DARK_BLUE} style={{ marginRight: 5 * ratio }} />
                            <CText color={'#000'} fontSize={14}>{item.pickUp}</CText>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 * ratio }}>
                            <MaterialCommunityIcons name={'bus-clock'} size={20 * ratio} color={COLOR.DARK_BLUE} style={{ marginRight: 5 * ratio }} />
                            <CText bold color={'#000'} fontSize={16}>{item.timeStart}</CText>
                        </View>
                        <View style={{ marginVertical: 7 * ratio, borderColor: COLOR.PRIMARY_BLUE, borderStyle: 'dashed', borderWidth: 1, borderRadius: 1, height: 1 * ratio }} />
                    </View>
                    <View>
                        <CText bold color={COLOR.RED} fontSize={16}>{formatCurrency(item.price)}đ</CText>
                    </View>
                </View>
                <CText bold color={COLOR.PRIMARY_ORANGE} fontSize={16}>{item.busTypeTitle}</CText>
                <CText bold color={COLOR.DEACTIVE_GRAY} fontSize={16}>Còn {item.availableSeat} chỗ</CText>
            </TouchableOpacity >
        );
    }
}

export default TripItem;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20 * ratio,
        marginVertical: 10 * ratio,
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
        padding: 18 * ratio,
    },
});