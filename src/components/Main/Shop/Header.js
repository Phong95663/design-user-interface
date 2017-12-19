import React, { Component } from 'react';
import { 
    View, Text, TouchableOpacity, Image, Dimensions, TextInput, StyleSheet 
} from 'react-native';
import global from '../../global';
import icLogo from '../../../media/appIcon/ic_logo.png';
import icMenu from '../../../media/appIcon/ic_menu.png';
import search from '../../../api/searchProduct';
const { height } = Dimensions.get('window');

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            txtSearch: ''
        };
    }

    onSearch(){
        const { txtSearch } = this.state;
        this.setState({txtSearch: ''});
        search(txtSearch)
        .then(arrProduct => global.setArraySearch(arrProduct))
        .catch(err => console.log(err));
    }
    render() {
        const { wrapper, row1, textInput, iconStyle, titleStyle } = styles;
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <TouchableOpacity onPress={this.props.onOpen}>
                        <Image source={icMenu} style={iconStyle} />
                    </TouchableOpacity>
                    <Text style={titleStyle}>MOBILE WORLD</Text>
                    <View />
                </View>
                <TextInput 
                    style={textInput}
                    placeholder="Nhập tên sản phẩm bạn muốn tìm "
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({txtSearch: text})}
                    value={this.state.txtSearch}
                    onFocus={() => global.gotoSearch()}
                    onSubmitEditing={this.onSearch.bind(this)} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { 
        height: height / 8, 
        backgroundColor: '#3473d8', 
        padding: 10, 
        justifyContent: 'space-around' 
    },
    row1: { flexDirection: 'row', justifyContent: 'space-between' },
    textInput: { 
        height: height / 23, 
        backgroundColor: '#FFF', 
        paddingLeft: 10,
        paddingVertical: 0 
    },
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: 20 },
    iconStyle: { width: 25, height: 25 }
});