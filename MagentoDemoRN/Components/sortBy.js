import React, {Component} from 'react';
import {ScrollView, Text, View,Image,FlatList,TouchableOpacity} from 'react-native';

export default class SortBy extends Component {

    render() {
        return (
            <View style={{width: Dimensions.get('window').width,backgroundColor:''}}>
                <TouchableOpacity style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Icon  
                        style={{}}
                        name="md-funnel"  
                        size={20}  
                        color="#6f7587"
                    />
                    <Text style={{paddingLeft: 10,color:'#6f7587'}}>Sort By</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Icon  
                        style={{}}
                        name="md-options"  
                        size={20}  
                        color="#6f7587"
                    />
                    <Text style={{paddingLeft: 10,color:'#6f7587'}}>Filter</Text>
                </TouchableOpacity>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => {
                    return this.Item({data: item});
                    }}
                    keyExtractor={item => item.id}
                    numColumns = {2}
                />
            </View>
        );
    }
}