import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import signIn from '../../api/signIn';
import global from '../global';
import saveToken from '../../api/saveToken';
import getToken from '../../api/getToken';
export default class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    

    onSignIn(){
        const { email, password } = this.state;
        signIn(email, password)
        .then(res => {
            if(res.err == 'SAI_THONG_TIN_DANG_NHAP' ){
                Alert.alert(
                    'Thông báo',
                    'Sai thông tin đăng nhập',
                    [
                        { text: 'OK'}
                    ],
                    { cancelable: false }
                )
            }else{
                global.onSignIn(res.user);
                this.props.goBackToMain();
                saveToken(res.token);
            }
        })
        .catch(err => console.log(err));
    }
    
    render() {
        const { inputStyle, bigButton, buttonText } = styles;
        const {email, password} = this.state;
        return (
            <View>
                <TextInput 
                    style={inputStyle} 
                    placeholder="Nhập địa chỉ email"
                    value={email}
                    onChangeText={text => this.setState({ email: text})} />
                <TextInput
                    style={inputStyle} 
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChangeText={text => this.setState({ password: text})}
                    secureTextEntry />
                <TouchableOpacity style={bigButton} onPress={this.onSignIn.bind(this)}>
                    <Text style={buttonText}>Đăng nhập ngay</Text>
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