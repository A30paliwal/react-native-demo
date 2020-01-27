import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TextInput,TouchableOpacity,FlatList, Dimensions ,ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';
const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item First Item First Item First Item",
      image: require("../../../Assets/picture1.jpg"),
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      image: require("../../../Assets/picture1.jpg"),
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
      image: require("../../../Assets/picture1.jpg"),
    },  
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
      image: require("../../../Assets/picture1.jpg")
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      image: require("../../../Assets/picture1.jpg")
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
      image: require("../../../Assets/picture1.jpg")
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
      image: require("../../../Assets/picture1.jpg")
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      image: require("../../../Assets/picture1.jpg")
    },
  ];

export default class Cart extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: () => (
                <Ionicons
                    style={{paddingLeft:10}}
                    name="md-arrow-back" 
                    size={30} 
                    color="#fff"
                    onPress={()=>navigation.goBack()}
                />
            ),
            headerRight: () => (
                <Ionicons
                    style={{paddingRight:10}}
                    name="md-search" 
                    size={30} 
                    color="#fff"
                    // onPress={()=>navigation.goBack()}
                />
            ),
        };
    }
    Item({data}) {
        return (
          <View style={{backgroundColor:'#fff',padding: 20,width:Dimensions.get('window').width,marginBottom:5
          }}>
              <TouchableOpacity style={{position:'absolute',top:5,right:5,padding:20}}>
                <Ionicons  
                    style={{}}
                    name="md-close-circle"  
                    size={20}  
                    color="#6f7000"
                />
                </TouchableOpacity>
              <Text style={{fontSize: 15,fontWeight:'bold',paddingTop:5,paddingLeft:1}} 
                  numberOfLines={1} ellipsizeMode='middle'>
                  {data.title}
              </Text>
    
              <View style={{height:90,  backgroundColor:'',flexDirection:'row'}}>           
                  <Image
                    source={data.image}
                    style={{ height: "95%", width: "25%",marginVertical:10}}
                  />
                  <View>
                      <View style={{flexDirection:'row',justifyContent:'center',marginBottom:20,paddingTop:8,paddingHorizontal:10}}> 
                          <Text style={{fontSize: 17,fontWeight:'bold',paddingTop:2,paddingLeft:1,color:'red'}}>$20.80
                          </Text>
                          <Text style={{fontSize: 11,paddingTop:6,paddingLeft:4,color:'#0d0d0d'}}>per piece</Text>
                      </View>
                      <View style={{flexDirection:'row',paddingBottom:8,paddingHorizontal:10}}>
                          <Text style={{fontSize: 14,color:'#0d0d0d'}}>Size
                          </Text>
                          <Text style={{fontSize: 15,fontWeight:'800',paddingLeft:20,color:'#0d0d0d'}}>XL</Text>
                      </View>
                      <View style={{flexDirection:'row',paddingHorizontal:10}}>
                          <Text style={{fontSize: 14,color:'#0d0d0d'}}>Qty
                          </Text>
                          <TouchableOpacity style={{paddingLeft:20}}>
                          <Ionicons  
                              style={{}}
                              name="md-remove-circle-outline"  
                              size={20}  
                              color="red"
                          />
                          </TouchableOpacity>
                          <Text style={{fontSize: 16,color:'#0d0d0d',paddingLeft:10}}>1</Text>
                          <TouchableOpacity style={{paddingLeft:10}}>
                          <Ionicons  
                              style={{}}
                              name="md-add-circle-outline"  
                              size={20}  
                              color="red"
                          />
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
              
              
            
          </View>
        );
      }
    
      render() {
        return (
      <SafeAreaView style={{}}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={{flex: 0.9}}>
          <FlatList
                  data={DATA}
                  renderItem={({ item }) => {return this.Item({data: item});}}
                  keyExtractor={(item, index) => `cart_${index}`}
                  numColumns = {1}
                  // ListFooterComponent={}
              />
          </View>
          <View style={{flex: 0.1,backgroundColor:'#fff',paddingHorizontal:20,paddingVertical:10}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15,backgroundColor:'#fff'}}> 
                      <Text style={{fontSize: 15,color:'#0d0d0d'}}>Sub Total
                      </Text>
                      <Text style={{fontSize: 15,color:'#0d0d0d'}}>$950</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:15,backgroundColor:'#fff'}}>
                      <Text style={{fontSize: 15,color:'#0d0d0d'}}>Shipping Cost
                      </Text>
                      <Text style={{fontSize: 15,color:'#0d0d0d'}}>+$30</Text>
                  </View>
                  <View style={{height:2,backgroundColor:'#0003',marginHorizontal:0}}></View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:15,backgroundColor:'#fff'}}>
                      <Text style={{fontSize: 17,fontWeight:'bold',color:'#0d0d0d'}}>Total
                      </Text>
                      <Text style={{fontSize: 17,fontWeight:'800',color:'red'}}>$980</Text>
                  </View>
            <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center',
                backgroundColor:'#FE9363',
                marginHorizontal:25,
                height:50,
                marginBottom:5,
                borderRadius: 7,
                shadowOffset:{ height: 1, width: 1 },
                shadowColor:'black',
                shadowRadius:6}}>
                <Text style={{alignSelf:"center",color:'#fff',fontSize: 17,fontWeight:'800'}}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        
      },
      container1: {
        
      },
      
    });
    







    