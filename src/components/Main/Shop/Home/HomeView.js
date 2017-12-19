import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import Category from './Category';
import TopProduct from './TopProduct';

class HomeView extends Component {
    render() {
        const { types, topProducts } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: '#c0c5ce' }}>
            <Category navigator={this.props.navigator} types={types} />
            <ScrollView >   
                <TopProduct navigator={this.props.navigator} topProducts={topProducts} />
            </ScrollView>
            </View>
        );
    }
}

export default HomeView;