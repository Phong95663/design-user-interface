import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import register from '../../api/register';
export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            rePassword: ''

        }
    }
    

    onSuccess(){
        Alert.alert(
            'Thông báo',
            'Đăng ký thành công',
            [
                { text: 'OK', onPress: this.props.gotoSignIn() }
            ],
            { cancelable: false }
        )

    }
    onFail(){
        Alert.alert(
            'Thông báo',
            'Email đã có người sử dụng',
            [
                { text: 'OK', onPress: this.removeEmail.bind(this)}
            ],
            { cancelable: false }
        )

    }
    removeEmail(){
        this.setState({ email: ''});
    }
    registerUser(){
        const { name, email, password } = this.state;
        register(email, name, password)
        .then(res => {
            if(res === 'THANH_CONG') return this.onSuccess();
            this.onFail();
        })
    }

    render() {
       const { inputStyle, bigButton, buttonText } = styles;
        return (
            <View>
                <TextInput 
                    style={inputStyle}
                    placeholder="Nhập tên người dùng"
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                />
                <TextInput 
                    style={inputStyle} 
                    placeholder="Nhập địa chỉ email"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })} />
                <TextInput
                     style={inputStyle}
                     placeholder="Nhập mật khẩu"
                     value={this.state.password}
                     secureTextEntry
                     onChangeText={text => this.setState({ password: text })}  />
                <TextInput
                    style={inputStyle}
                    placeholder="Xác nhận mật khẩu"
                    value={this.state.rePassword}
                    secureTextEntry
                    onChangeText={text => this.setState({ rePassword: text })} />
                <TouchableOpacity style={bigButton} onPress={this.registerUser.bind(this)}>
                    <Text style={buttonText}>Xác nhận đăng ký</Text>
                </TouchableOpacity>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30
    },
    bigButton: {
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontWeight: '400'
    }
});