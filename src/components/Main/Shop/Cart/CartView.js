import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ListView,
    Dimensions, StyleSheet, Image, Alert
} from 'react-native';
import global from '../../../global';
import sendOrder from '../../../../api/sendOrder';
import getToken from '../../../../api/getToken';
const url = 'https://user-interface-vuphong95663.c9users.io/api/images/product/';
function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

class CartView extends Component {
    incrQuantity(id){
        global.incrQuantity(id);
    }
    decrQuantity(id){
        global.decrQuantity(id);
    }
    removeProduct(id){
        global.removeProduct(id);
    }
    gotoDetail(product) {
        const { navigator } = this.props;
        navigator.push({ name: 'PRODUCT_DETAIL', product });
    }

    async onSendOrder(){
        try {
            const token = await getToken();
            const arrayDetail = this.props.cartArray.map(e => ({
                id: e.product.id, 
                quantity: e.quantity
            }));
            
            
            const kq = await sendOrder(token, arrayDetail);
            if(kq === 'THEM_THANH_CONG'){
                console.log('Them thanh cong')
                Alert.alert(
                    'Thông báo',
                    'Bạn đã gửi đơn hàng thành công',
                    [
                        { text: 'OK'}
                    ],
                    { cancelable: false }
                )
            }else{
                console.log('Them that bai')
                Alert.alert(
                    'Thông báo',
                    'Bạn đã gửi thất bại',
                    [
                        { text: 'OK'}
                    ],
                    { cancelable: false }
                )
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const { main, checkoutButton, checkoutTitle, wrapper,
            productStyle, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer } = styles;
        const { cartArray } = this.props;
        const arrTotal = cartArray.map(e => e.product.price * e.quantity);
        const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
        return (
            <View style={wrapper}>
                <ListView
                    contentContainerStyle = {main}
                    enableEmptySections
                    dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 }).cloneWithRows(cartArray)}
                    renderRow={ cartItem => (
                        <View style={productStyle} >
                            <Image source={{uri: `${url}${cartItem.product.images[0]}`}} style={productImage} />
                            <View style={[mainRight]}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={txtName}>{toTitleCase(cartItem.product.name)}</Text>
                                    <TouchableOpacity onPress={()=> this.removeProduct(cartItem.product.id)}>
                                        <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={txtPrice}>{cartItem.product.price} VNĐ</Text>
                                </View>
                                <View style={productController}>
                                    <View style={numberOfProduct}>
                                        <TouchableOpacity onPress={()=> this.incrQuantity(cartItem.product.id)}>
                                            <Text>+</Text>
                                        </TouchableOpacity>
                                        <Text>{cartItem.quantity}</Text>
                                        <TouchableOpacity onPress={()=> this.decrQuantity(cartItem.product.id)}>
                                            <Text>-</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={showDetailContainer} onPress={() => this.gotoDetail(cartItem.product)}>
                                        <Text style={txtShowDetail}>Xem thông tin</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
                <TouchableOpacity style={checkoutButton} onPress={this.onSendOrder.bind(this)}>
                    <Text style={checkoutTitle}>Tổng:  {total} VNĐ/ Đặt hàng ngay</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = imageWidth;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#c0c5ce'
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: '#3473d8',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#c0c5ce'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    productStyle: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default CartView;