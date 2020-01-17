import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
const DATA = [
  {
    title: 'Home',
    icon: 'md-home',
    path: 'Home'
  },
  {
    title: 'Categories',
    icon: 'md-grid',
    path: 'Categories'
  },
  {
    title: 'My Orders',
    icon: 'md-pint',
    path: 'MyOrders'
  },
  {
    title: 'Wishlist',
    icon: 'md-heart',
    path: 'Wishlist'
  },
  {
    title: 'Account',
    icon: 'md-person',
    path: 'Account'
  },
  {
    title: 'Settings',
    icon: 'md-settings',
    path: 'Settings'
  },
  {
    title: 'Logout',
    icon: 'md-log-out',
    path: ''
  },
];
class SideMenu extends Component {

  constructor(props) {
    super(props);
    // const { navigate } = props.navigation;
    this.state = {
      name: "",
      email: "",
      userDetails: null
    }
  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }
  componentDidMount() {
    this.getData()

  }
  Item = (title, icon, path) => (
    <TouchableOpacity activeOpacity={0.8} onPress={this.navigateToScreen(path)} style={{ backgroundColor: 'transparent', paddingBottom: 30, flexDirection: 'row' }}>
      <Icon
        style={{ paddingRight: 25 }}
        name={icon}
        size={20}
        color="#fff"
      />
      <Text style={{ alignSelf: 'center', color: 'white' }}>{title}</Text>
    </TouchableOpacity>
  )
  getData = async () => {
    try {
      let value = await AsyncStorage.getItem('userData')
      this.setState({ userDetails: JSON.parse(value) });
      console.log(value)
      if (this.state.userDetails != null) {
        this.setState({
          name: this.state.userDetails.first_name + " " + this.state.userDetails.last_name,
          email: this.state.userDetails.email
        })

      }
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>

          <View style={{ flexDirection: "row", alignItems: 'center', alignContent: 'center', paddingLeft: 30, paddingVertical: 30 }}>
            <Image style={{
              width: 65,
              height: 65,
              borderRadius: 33,
              borderWidth: 3,
              borderColor: "red"
            }}
              source={require('../Assets/splash.png')}
            />
            {this.state.userDetails &&
              <View style={{ paddingHorizontal: 12, paddingBottom: 10 }}>
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: "500" }} numberOfLines={1} ellipsizeMode='tail' onPress={this.navigateToScreen('Page1')}>
                  {`${this.state.userDetails.first_name} ${this.state.userDetails.last_name}`}
                </Text>
                <Text style={{ fontSize: 13, color: '#fff' }} numberOfLines={1} ellipsizeMode='tail' onPress={this.navigateToScreen('Page1')}>
                  {`${this.state.userDetails.email}`}
                </Text>
              </View>}
          </View>
          <View style={{ height: 1, backgroundColor: '#fff9', marginHorizontal: 25 }} />
          <View style={{ margin: 40 }}>
            <FlatList
              data={DATA}
              renderItem={({ item }) => this.Item(item.title, item.icon, item.path)
              }
              keyExtractor={(item, index) => `sidebar_${index}`}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FE6963'
  },
  navItemStyle: {

  },
  navSectionStyle: {
    // backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  }
};