import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';
import Snackbar from 'react-native-snackbar';
let url = "http://13.229.75.231/pub/media/catalog/product/";
export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      DATA: []
    };
  }
  componentDidMount() {
    this.apiValidation()
  }
  apiValidation = () => {
    return fetch("http://13.229.75.231/rest/default/V1/products?storeId=1&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[filterGroups][1][filters][0][field]=status&searchCriteria[filterGroups][1][filters][0][value]=1&searchCriteria[filterGroups][1][filters][0][conditionType]=eq&searchCriteria[filterGroups][2][filters][0][field]=visibility&searchCriteria[filterGroups][2][filters][0][conditionType]=neq&searchCriteria[filterGroups][2][filters][0][value]=1&searchCriteria[sortOrders][0][direction]=ASC&searchCriteria[filterGroups][0][filters][0][value]=3&currencyCode=USD&searchCriteria[currentPage]=1&searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[pageSize]=10"
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
          let DATA = data.items
          let temp = DATA.map(obj => {
            obj.thumbnail = this.APIfiler(obj.custom_attributes, "thumbnail");
            temp1.push(obj)
          })
          this.setState({ DATA });
          console.log(DATA)
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
  APIfiler(data, key) {
    let image = data.filter(obj => {
      return obj.attribute_code == key
    })
    return image[0].value
  }

  Item({ data }) {
    return (
      <View style={{
        backgroundColor: '#fff', marginLeft: 20, marginTop: 10,
      }}>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={{
            height: 250, width: 180, backgroundColor: '', borderRadius: 10,
          }}>
            <Image
              source={{ uri: url + data.thumbnail }}
              style={{ height: "100%", width: "100%", borderTopRightRadius: 10, borderTopLeftRadius: 10, flex: 1 }}
            />
            <View style={{
              position: 'absolute', top: 0, left: 0, backgroundColor: '#FE6963', justifyContent: 'center',
              height: 22, width: 40, borderTopLeftRadius: 5
            }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff', textAlign: 'center' }}>35%</Text>
            </View>
            <TouchableOpacity style={{ position: 'absolute', top: 3, right: 5}}>
              <Icon
                style={{}}
                name="md-heart"
                size={20}
                color={(data.extension_attributes.is_wishlist_product)? "#fff" : "red"}
              />
              {(data.extension_attributes.is_wishlist_product)}
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 15, fontWeight: 'bold', paddingTop: 5, paddingLeft: 1 }} numberOfLines={1} ellipsizeMode='middle'>{data.name}</Text>
              <Text style={{ fontSize: 17, fontWeight: 'bold', paddingTop: 2, paddingLeft: 1, color: 'red' }}>${(data.price.toFixed(2))}</Text>
              <View style={{
                position: 'absolute', bottom: 1, right: 0, backgroundColor: 'green',
                height: 19, width: 43, borderRadius: 5, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'
              }}>
                <Text style={{ fontSize: 12, fontWeight: '800', color: '#fff', textAlign: 'left', paddingLeft: 5 }}>
                  {(data.extension_attributes.avg_rating / 20).toFixed(1)}</Text>
                <Icon
                  style={{ paddingRight: 3, paddingTop: 1 }}
                  name="md-star"
                  size={14}
                  color="#fff"
                />
              </View>
            </View>
          </View>

        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={{}}>
        <ScrollView>
          <View style={{
            width: Dimensions.get('window').width,
            height: 40, flexDirection: 'row', backgroundColor: ''
          }}>
            <TouchableOpacity style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                style={{}}
                name="md-funnel"
                size={20}
                color="#6f7587"
              />
              <Text style={{ paddingLeft: 10, color: '#6f7587' }}>Sort By</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                style={{}}
                name="md-options"
                size={20}
                color="#6f7587"
              />
              <Text style={{ paddingLeft: 10, color: '#6f7587' }}>Filter</Text>
            </TouchableOpacity>


          </View>
          <View style={{ backgroundColor: '#fff', }}>
            <FlatList
              data={this.state.DATA}
              renderItem={({ item }) => { return this.Item({ data: item }); }}
              keyExtractor={(item, index) => `products_${index}`}
              numColumns={2}
            />
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
