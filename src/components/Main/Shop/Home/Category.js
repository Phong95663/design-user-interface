import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');
const url = 'https://user-interface-vuphong95663.c9users.io/api/images/type/';

export default class Category extends Component {
    gotoListProduct(category) {
        const { navigator } = this.props;
        navigator.push({ name: 'LIST_PRODUCT', category });
    }
    render() {
        const { types } = this.props;
        const { wrapper, textStyle, imageStyle, cateTitle } = styles;
        return (
            <View style={wrapper}>
                <View style={{ justifyContent: 'center', height: 50 }}>
                    <Text style={textStyle} >DANH MỤC SẢN PHẨM</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around' }}>
               
                    <View >
                        { types.map(e => (
                            <View  key={e.id}>
                            <TouchableOpacity onPress={() => this.gotoListProduct(e)} 
                            style = {{ width: width - 30, backgroundColor: '#83acef', alignItems: 'center'}}
                            >
                                <Text style={cateTitle}>{e.name}</Text>
                            </TouchableOpacity>
                            <View style={{height: 10}}/>
                            </View>                
                        )) }
                    </View>
                   
                </View>
            </View>
        );
    }
}
const imageWidth = width - 40;
const imageHeight = imageWidth / 2;

const styles = StyleSheet.create({
    wrapper: {
        width: width - 20,
        backgroundColor: '#FFF',
        margin: 10,
        justifyContent: 'space-between',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        paddingTop: 0
    },
    textStyle: {
        fontSize: 15,
        color: '#626872'
    },
    imageStyle: {
        height: imageHeight,
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cateTitle: {
        fontSize: 20,
        fontFamily: 'Avenir',
        color: '#fff',
        
    }
});