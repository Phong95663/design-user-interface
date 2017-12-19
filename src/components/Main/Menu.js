import React, { Component } from 'react';
import {
    View, Text,
    TouchableOpacity, StyleSheet, Image
} from 'react-native';

import profileIcon from '../../media/temp/avatar.jpg';
import global from '../global';
import saveToken from '../../api/saveToken';
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null };
        global.onSignIn = this.onSignIn.bind(this);
    }
    onSignIn(user){
        this.setState({ user });
    }
    onSignOut(){
        this.setState({user: null});
        saveToken('');
    }
    gotoAuthentication() {
        const { navigator } = this.props;
        navigator.push({ name: 'AUTHENTICATION' });
    }
    gotoChangeInfo() {
        const { navigator } = this.props;
        navigator.push({ name: 'CHANGE_INFO', user: this.state.user });
    }
    gotoOrderHistory() {
        const { navigator } = this.props;
        navigator.push({ name: 'ORDER_HISTORY' });
    }
    render() {
        const { 
            container, profile, btnStyle, btnText, 
            btnSignInStyle, btnTextSignIn, loginContainer,
            username
        } = styles;
        const { user } = this.state; 
        const logoutJSX = (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={btnStyle} onPress={this.gotoAuthentication.bind(this)}>
                    <Text style={btnText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        );
        const loginJSX = (
            <View style={loginContainer}>
                <Text style={username}>{user ? user.name : ''}</Text>
                <View>
                    {/* <TouchableOpacity style={btnSignInStyle} onPress={this.gotoOrderHistory.bind(this)}>
                        <Text style={btnTextSignIn}>Lịch sử mua hàng</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={btnSignInStyle} onPress={this.gotoChangeInfo.bind(this)}>
                        <Text style={btnTextSignIn}>Thay đổi thông tin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btnSignInStyle}>
                        <Text style={btnTextSignIn} onPress={this.onSignOut.bind(this)}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
                <View />
            </View>
        );
        const mainJSX = this.state.user ? loginJSX : logoutJSX;
        return (
            <View style={container}>
                <Image source={profileIcon} style={profile} />
                { mainJSX }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3473d8',
        borderRightWidth: 3,
        borderColor: '#fff',
        alignItems: 'center'
    },
    profile: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 30
    },
    btnStyle: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50
    },
    btnText: {
        color: '#3473d8',
        fontFamily: 'Avenir', 
        fontSize: 17
    },
    btnSignInStyle: {
        height: 50,
        backgroundColor: '#fff',
        width: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10
    },
    btnTextSignIn: {
        color: '#3473d8',
        fontSize: 15
    },
    loginContainer: {
        flex: 1, 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    username: {
        color: '#fff', 
        fontFamily: 'Avenir', 
        fontSize: 20
    }
});

export default Menu;