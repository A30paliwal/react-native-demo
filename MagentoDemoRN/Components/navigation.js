import React, {Component} from 'react';
import {View,TouchableOpacity,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'; 
import Login from './login';
import Register from './register';
import Dashboard from './dashboard';
import Categories from './categories';
import MyOrders from './myOrders';
import Wishlist from './wishlist';
import Account from './account';
import Settings from './settings';
import Products from './products';
import SideMenu from './sidemenu';

const AppNavigator = createStackNavigator(
    {
      login: { 
          screen: Login,
          navigationOptions: {
            headerShown: false,
          }
       },
      register: { 
          screen: Register,
          navigationOptions: {
              headerShown: false,
          }
       },
       dashboard: {
           screen: Dashboard,
           navigationOptions: {
              title: "HOME",
              headerShown: true,
              headerTintColor: "#fff",
              headerStyle: {
                  backgroundColor:'#FE6963'
              },
              headerTitleStyle: {
                  fontSize:20
              },
              headerRight: () => (
                  headerRightView()
              )
          }
       }
    },
    {  
        defaultNavigationOptions: ({ navigation }) => {  
        return {  
            headerShown: true,
            headerLeft: () => (  
                <Icon  
                    style={{ paddingLeft: 10 }}  
                    onPress={() => navigation.openDrawer()}  
                    name="md-menu"  
                    size={30}  
                    color="#fff"
                />  
            )  
        };  
        }  
    },
    {
    initialRouteName: 'login',
    }
  );
const CategoryStackNavigator = createStackNavigator(  
    {  
        Categories: Categories  
    },  
    {  
        defaultNavigationOptions: ({ navigation }) => {  
        return {  
            title: "Category",
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor:'#FE6963'
            },
            headerTitleStyle: {
                fontSize:20
            },
            headerLeft: (  
                <Icon  
                    style={{ paddingLeft: 10 }}  
                    onPress={() => navigation.openDrawer()}  
                    name="md-menu"  
                    size={30}  
                    color="#fff"
                />
            ),
            headerRight: () => (
                headerRightView()
            )  
        };  
        }  
    }  
);
const ProductStackNavigator = createStackNavigator(  
    {  
        Categories: Products  
    },  
    {  
        defaultNavigationOptions: ({ navigation }) => {  
        return {  
            title: "PRODUCTS",
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor:'#FE6963'
            },
            headerTitleStyle: {
                fontSize:20
            },
            headerLeft: (  
                <Icon  
                    style={{ paddingLeft: 10 }}  
                    onPress={() => navigation.openDrawer()}  
                    name="md-menu"  
                    size={30}  
                    color="#fff"
                />
            ),
            headerRight: () => (
                headerRightView()
            )  
        };  
        }  
    }  
);
const CartStackNavigator = createStackNavigator(  
    {  
        Categories: Wishlist  
    },  
    {  
        defaultNavigationOptions: ({ navigation }) => {  
        return {  
            title: "MY CART",
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor:'#FE6963'
            },
            headerTitleStyle: {
                fontSize:20
            },
            headerLeft: (  
                <Icon  
                    style={{ paddingLeft: 10 }}  
                    onPress={() => navigation.openDrawer()}  
                    name="md-arrow-back"  
                    size={30}  
                    color="#fff"
                />
            ),  
        };  
        }  
    }  
);
headerRightView = () =>{
    return(
                <View style={{flexDirection:"row"}}>
                <TouchableOpacity
                  onPress={() => alert('This is a button!')}
                  style={{paddingHorizontal:10}}>
                    <Icon name="md-search" size={30} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => alert('This is a button!')}
                  style={{paddingHorizontal:10}}>
                    <Icon name="md-cart" size={30} color="#fff"/>
                </TouchableOpacity>
                </View>
    );
}
const AppDrawerNavigator = createDrawerNavigator( 
    { 
        Home: {  
            screen: AppNavigator
        },
        Categories: {  
            screen: CategoryStackNavigator,
            navigationOptions: {
                headerShown: true,
            } 
        },
        MyOrders: {
            screen: ProductStackNavigator,
            navigationOptions: {
                headerShown: true,
            }
        },
        Wishlist: {  
            screen: CartStackNavigator,
            navigationOptions: {
                headerShown: true,
            }
        },
        Account: {
            screen: Account
        },
        Settings: {
            screen: Settings  
        }
    },
    {
        contentComponent: SideMenu,
        drawerType:'front',
        // overlayColor:'#000'
        // edgeWidth:300
    },
    // {  
    //     defaultNavigationOptions: ({ navigation }) => {  
    //         return {
    //             headerShown:true,
    //             headerLeft: (  
    //                 <Icon  
    //                     style={{ paddingLeft: 10 }}  
    //                     onPress={() => navigation.openDrawer()}  
    //                     name="md-menu"  
    //                     size={30}  
    //                 />  
    //             )  
    //         };  
    //     }  
    // },
    // {
    //     initialRouteName: 'Home',
    // }
);  
  
const AppStackNavigator = createStackNavigator({  
    Dashboard: { screen: AppDrawerNavigator },  
  },
    {  
            defaultNavigationOptions: ({ navigation }) => {  
                return {
                    headerShown:false,
                    headerLeft: (  
                        <Icon  
                            style={{ paddingLeft: 10 }}  
                            onPress={() => navigation.openDrawer()}  
                            name="md-menu"  
                            size={30}  
                        />  
                    )  
                };  
            }  
        },
        {
            initialRouteName: 'Dashboard',
        }
);  
  
const AppContainer = createAppContainer(AppStackNavigator);

export default AppContainer