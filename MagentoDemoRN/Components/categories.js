import React, { Component } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import Snackbar from 'react-native-snackbar';
import Entypo from 'react-native-vector-icons/Entypo';
export default class Categories extends Component {

  static navigationOptions = {
    title: 'Categories',
    headerShown: true,
  };
  constructor() {
    super();
    this.selectedIndex = -1;
    this.state = {
      DATA: [],
      layout_Height: 0
    }
  }
  componentDidMount() {
    this.apiValidation()
  }
  apiValidation = () => {
    return fetch("http://13.229.75.231/rest/V1/categories"
      , {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then((response) => {
        var statusCode = response[0];
        var data = response[1];
        console.log(statusCode);
        if (statusCode == 200) {
          let temp1 = []
          let DATA = data.children_data
          let temp = DATA.map(obj => {
            obj.expanded = false
            temp1.push(obj)
          })
          this.setState({ DATA });
          console.log('DATA:', DATA)
        } else {
          Snackbar.show({
            title: "dj",
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  Item({ data,index }) {
    return (
      <TouchableOpacity activeOpacity={0.8} style={{}} onPress={() => {
        let tempData = this.state.DATA;
        tempData[index].expanded = !tempData[index].expanded;
        // 
        // if(this.selectedIndex != -1 && this.selectedIndex != index){
        //   tempData[this.selectedIndex].expanded = false;
        // }
        // this.selectedIndex = index;
        this.setState({DATA:[...tempData]})
      }}>
        <View style={{
          backgroundColor: '#fff', marginBottom: 5, paddingHorizontal: 10, height: 60,
          justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'
        }}>

          {<Text style={{ color: 'black', fontSize: 20 ,fontWeight:'bold'}}>{data.name}</Text>}
          {data.children_data && (data.children_data.length > 0) && <Entypo
            style={{}}
            name={data.expanded ? "chevron-down" : "chevron-right"}
            size={25}
            color={"#000"}
          />}

        </View>
        {this.toggleExpand(data)}
      </TouchableOpacity>

    );
  }
  Item2({ data }) {
    return (
      <TouchableOpacity activeOpacity={0.8} style={{}}>
        <View style={{
          backgroundColor: '#fff', paddingHorizontal: 10, height: 60,
          justifyContent: 'center'
        }}>
          {<Text style={{ color: 'black', fontSize: 15 }}>{data.name}</Text>}
        </View>

      </TouchableOpacity>
    );
  }
  toggleExpand(data) {
    if (data.expanded == true) {
      return (
        <View style={{ flex: 1 }}>
          {
            data.children_data.length > 0 && <FlatList
              bounces={false}
              data={data.children_data}
              renderItem={({ item }) => { return this.Item2({ data: item }); }}
              keyExtractor={(item, index) => `dashboard_${index}`}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={this.ItemSeperatorSubView}
              ListFooterComponent={this.listFooterSubView}
            />
          }
        </View>
      )
    }
  }
  listFooterView = () => {
    return <View style={{ backgroundColor: "#fff", height: '100%', flexGrow: 1 }}>
    </View>
  }
  listFooterSubView = () => {
    return <View style={{ marginBottom: 5 }}>
    </View>
  }
  ItemSeperatorSubView = () => {
    return <View style={{ marginBottom: 3 }}>
    </View>
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {
          this.state.DATA && <FlatList
            bounces={false}
            data={this.state.DATA}
            renderItem={({ item,index }) => { return this.Item({ data: item,index }); }}
            keyExtractor={(item, index) => `dashboard_${index}`}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={this.listFooterView}
          />
        }
      </SafeAreaView>
    );
  }
}