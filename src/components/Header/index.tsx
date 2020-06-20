import { HEADER_TYPE } from 'config/themeUtils';
import React from 'react';
import MainHeader from 'components/Header/mainHeader';
import NormalHeader from './normalHeader';
import InfoHeader from './infoHeader';

interface Props {
    type: string;
    headerTitle?: string;
    headerSubtitle?: string;
    pickup?: string;
    dropdown?: string;
    viewNoti?: () => void;
    searchOrder? : () => void;
    onBack?: () => void;
    onLeftPress?: () => void;
    onRightPress?: () => void;
}

class Header extends React.Component<Props, {}> {
    static defaultProps = {
        type: HEADER_TYPE.MAIN,
        headerTitle: 'Tra cứu',
        headerSubTitle: '',
        pickup: '',
        dropdown: '',
        viewNoti: () => {},
        searchOrder: () => {},
        onBack: () => {},
        onLeftPress: () => {},
        onRightPress: () => {}
    }

    render() {
        const { type } = this.props;

        if (type === HEADER_TYPE.MAIN) {
            return (
                <MainHeader viewNoti={this.props.viewNoti} searchOrder={this.props.searchOrder} />
            )
        }
        if (type === HEADER_TYPE.NORMAL) {
            return (
                <NormalHeader onBack={this.props.onBack} headerTitle={this.props.headerTitle} />
            )
        }
        if (type === HEADER_TYPE.INFO) {
            return (
                <InfoHeader onBack={this.props.onBack} pickup={this.props.pickup} dropdown={this.props.dropdown} headerSubtitle={this.props.headerSubtitle} onLeftPress={this.props.onLeftPress} onRightPress={this.props.onRightPress} />
            )
        }
        return null;
    }
}

export default Header;