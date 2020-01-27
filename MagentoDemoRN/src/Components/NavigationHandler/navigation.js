import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Login from '../../Screens/LoginModule/LoginScreen';
import Register from '../../Screens/LoginModule/RegisterScreen';
import Dashboard from '../../Screens/DashboardModule/DashboardScreen';
import Categories from '../../Screens/SideBarModule/CategoriesScreen';
import FilterModal from '../../Screens/DashboardModule/FilterScreen';
import MyOrders from '../../Screens/SideBarModule/OrdersScreen';
import Wishlist from '../../Screens/SideBarModule/WishlistScreen';
import Account from '../../Screens/SideBarModule/AccountScreen';
import Settings from '../../Screens/SideBarModule/SettingScreen';
import Products from '../../Screens/DashboardModule/ProductScreen';
import SideMenu from '../../Screens/SideBarModule/SideMenuScreen';
import SplashScreen from '../../Screens/LoginModule/SplashScreen';
import Cart from '../../Screens/DashboardModule/CartScreen'

const AuthNavigator = createStackNavigator(
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
    },
    {
        initialRouteName: 'login',
    }
);
const DashboardStackNavigator = createStackNavigator(
    {
        dashboard: {
            screen: Dashboard,
            navigationOptions: {
                title: "HOME",
                headerShown: true,
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#FE6963',
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 22
                },
                // headerRight: () => (
                //     headerRightView()
                // )
            }
        },
        cart: {
            screen:Cart,
            navigationOptions: {
                title: "CART",
                headerShown: true,
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#FE6963',
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 22
                },
                // headerRight: () => (
                //     headerRightView()
                // )
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
                    backgroundColor: '#FE6963'
                },
                headerTitleStyle: {
                    fontSize: 20
                },
                headerLeft: () => (
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
        products: {
            screen: Products,
            navigationOptions: {
                title: "Products",
                headerShown: true,
                headerLeft: ({navigation}) => (
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
            }

        },
        filter: {
            screen: FilterModal,
            navigationOptions: {
                
                title: "Filter",
                headerShown: true,
                headerRight: ({navigation}) => (
                    <Icon
                        style={{ paddingLeft: 10 }}
                        onPress={() => navigation.goBack()}
                        name="md-close-circle"
                        size={30}
                        color="#fff"
                    />
                )
            }
        }
    },
    {
        mode: 'modal',
        defaultNavigationOptions: ({ navigation }) => {
            return {
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#FE6963'
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 22
                },

                headerRight: () => (
                    headerRightView()
                )
            };
        }
    }
);
const WishlistStackNavigator = createStackNavigator(
    {
        wishlist: Wishlist
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                title: "WISHLIST",
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: '#FE6963'
                },
                headerTitleStyle: {
                    fontSize: 20
                },
                headerLeft: () => (
                    <Icon
                        style={{ paddingLeft: 10 }}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu"
                        size={30}
                        color="#fff"
                    />
                ),
            };
        }
    }
);
headerRightView = () => {
    return (
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
                onPress={() => alert('This is a button!')}
                style={{ paddingHorizontal: 10 }}>
                <Icon name="md-search" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => alert('This is a button!')}
                style={{ paddingHorizontal: 10 }}>
                <Icon name="md-cart" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}
const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: DashboardStackNavigator
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
            screen: WishlistStackNavigator,
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
        drawerType: 'front',
        // overlayColor:'#000'
        // edgeWidth:300
    },
    {
        initialRouteName: 'Home',
    }
);

const InitialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    App: AppDrawerNavigator,
    Auth: AuthNavigator
});

const AppContainer = createAppContainer(InitialNavigator);

export default AppContainer