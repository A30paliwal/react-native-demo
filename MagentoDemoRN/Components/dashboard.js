import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SectionList
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ListDetail from '../CustomComponents/listDetail';
let BASE_URL = "http://13.229.75.231/";
let Media_BASE_URL= "pub/media";
let CATEGORYMEDIA_BASE_URL= BASE_URL + "pub/media/catalog/category/";
let PRODUCTMEDIA_BASE_URL= BASE_URL + "pub/media/catalog/product";
let SLIDERMedia_BASE_URL= BASE_URL + "pub/media";


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DATA: {},
      Categories:{},
      Products:{},
      _isMounted: false,
    };
  }
  componentDidMount() {
    this._isMounted = true
    this._isMounted && this.apiValidation()
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  productsData = () => {
    
    let temp1 = []
    let Products = this.state.DATA.products[0].value.items
    console.log('Products',Products)
    let temp = Products.map(obj => {
      obj.image = this.APIfiler(obj.custom_attributes, "image");
      console.log(obj)
      temp1.push(obj)
    })
    this.setState({ Products },()=>console.log("123456",this.state.Products));
    
  }
  CategoryData = () => {
    
    let temp1 = []
    let Categories = this.state.DATA.categories[0].value.items
    console.log('Categories',Categories)
    let temp = Categories.map(obj => {
      obj.image = this.APIfiler(obj.custom_attributes, "image");
      console.log(obj)
      temp1.push(obj)
    })
    this.setState({ Categories },()=>console.log("123456",this.state.Categories));
    
  }
  APIfiler(data, key) {
    let image = data.filter(obj => {
      return obj.attribute_code == key
    })
    return image[0].value
  }
  apiValidation = () => {
    return fetch("http://13.229.75.231/rest/default/V1/magento/dashboard"
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
          // let temp1 = []
          let DATA = data
          
          // let temp = DATA.slides.map(obj => { obj
          //   // console.log(obj)
          //   // temp1.push(obj)
          // })
          this._isMounted && this.setState({ DATA },()=>this.CategoryData());
          this.state.DATA.products && this.productsData()
          
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
  
  Item2({ data }) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          backgroundColor: '#fff',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').width / 1.39,
          padding: 10,
        }}>
        <View style={{
          shadowColor: "#0007",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.9,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: '#0002',
          borderRadius: 10,
        }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
            }}
            defaultSource={require('../Assets/placeholder.png')}
            source={{ uri: SLIDERMedia_BASE_URL + data.image }}
          />
        </View>
      </TouchableOpacity>
    );
  }
  Item3({ data }) {
    return (
      <View>

        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: '#fff',
            width: Dimensions.get('window').width / 2.2,
            height: (Dimensions.get('window').width / 2.3) * 1.39,
            padding: 10,
          }}>
          <View style={{
            shadowColor: "#0007",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.9,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: '#0002',
            borderRadius: 10,
          }}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
              defaultSource={require('../Assets/placeholder.png')}
              source={{ uri: CATEGORYMEDIA_BASE_URL + data.image }}
            />
            {console.log(data.image)}
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 19, marginHorizontal: 10, fontWeight: 'bold', color: '#0007' }}>{data.name}</Text>
      </View>
    );
  }
  Item4({ data }) {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: '#fff',
            width: Dimensions.get('window').width / 1.3,
            height: (Dimensions.get('window').width / 2.3) * 1.39,
            padding: 10,
          }}>
          <TouchableOpacity style={{ position: 'absolute', top: 5, left: 5, padding: 10 }}>
            <Icon
              style={{}}
              name="md-heart"
              size={20}
              color={(data.extension_attributes.is_wishlist_product) ? "#fff" : "red"}
            />
          </TouchableOpacity>
          <View style={{
            shadowColor: "#0007",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.9,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: '#0002',
            borderRadius: 10,
          }}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
              defaultSource={require('../Assets/placeholder.png')}
              source={{ uri: PRODUCTMEDIA_BASE_URL + data.image }}
            />
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 19, marginHorizontal: 10, fontWeight: 'bold', color: '#0007' }}>{data.name}</Text>
      </View>
    );
  }
  Item({ data }) {

    return (
      <TouchableOpacity>
        <View style={{
          backgroundColor: 'lightblue', marginLeft: 8, marginVertical: 25, 
          padding: 9, borderRadius: 20, minWidth: 100,
          shadowColor: "#0008",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.6,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
          {<Text style={{ alignSelf: 'center', color: 'white' }}>{data.name}</Text>}

        </View>
      </TouchableOpacity>
    );
  }
  listFooterView = () => {
    return <View style={{marginRight:10}}></View>
   }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'
          alwaysBounceVertical={false}>
          <View>
            {
              this.state.DATA.top_categories && <FlatList
                horizontal={true}
                data={this.state.DATA.top_categories.items}
                renderItem={({ item }) => { return this.Item({ data: item }); }}
                keyExtractor={(item, index) => `dashboard_${index}`}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={this.listFooterView}
              />
            }
            {
              this.state.DATA.slides && <FlatList
                pagingEnabled
                alwaysBounceHorizontal={false}
                horizontal={true}
                data={this.state.DATA.slides}
                renderItem={({ item }) => { return this.Item2({ data: item }); }}
                keyExtractor={(item, index) => `dashboard1_${index}`}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={this.listFooterView}
              />
            }
            {
              this.state.DATA.categories && <Text style={{ fontSize: 20, marginHorizontal: 10, fontWeight: '700', paddingTop: 30 }}>
                {(this.state.DATA.categories[0].key).toUpperCase()}
              </Text>
            }
            {
              this.state.DATA.categories && this.state.Categories && <FlatList
                alwaysBounceHorizontal={false}
                horizontal={true}
                data={this.state.Categories}
                renderItem={({ item }) => { return this.Item3({ data: item }); }}
                keyExtractor={(item, index) => `dashboard4_${index}`}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={this.listFooterView}
              />
            }
            {
              this.state.DATA.products && <Text style={{ fontSize: 20, marginHorizontal: 10, fontWeight: '700', paddingTop: 30 }}>
                {(this.state.DATA.products[0].key).toUpperCase()}
              </Text>
            }
            {
              this.state.DATA.products && this.state.Products && <FlatList
                alwaysBounceHorizontal={false}
                horizontal={true}
                data={this.state.Products}
                renderItem={({ item }) => { return this.Item4({ data: item }); }}
                keyExtractor={(item, index) => `dashboard4_${index}`}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={this.listFooterView}
              />
            }
            {
              this.state.DATA.products && <Text style={{ fontSize: 20, marginHorizontal: 10, fontWeight: '700', paddingTop: 30 }}>
                {(this.state.DATA.products[1].key).toUpperCase()}
              </Text>
            }
            {
              this.state.DATA.products && <FlatList
                alwaysBounceHorizontal={false}
                horizontal={true}
                data={this.state.DATA.products[1].value.items}
                renderItem={({ item }) => { return this.Item4({ data: item }); }}
                keyExtractor={(item, index) => `dashboard4_${index}`}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={this.listFooterView}
              />
            }
            <View style={{marginBottom:15}}></View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },
  item: {
    backgroundColor: '#0005',
  },
  header: {
    fontSize: 16,
  },
}