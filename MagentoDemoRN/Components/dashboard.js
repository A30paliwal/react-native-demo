import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SectionList
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import ListDetail from '../CustomComponents/listDetail';
let url = "http://13.229.75.231/pub/media/";


const DATA3 = [
  {
    title: 'FEATURED CATEGORIES',
    data: [[{
      title: '../Assets/picture1.png',
    },
    {
      title: '../Assets/picture1.png',
    },
    {
      title: '../Assets/picture1.png',
    }]],
  },
  {
    title: 'HOT SELLER PRODUCT',
    data: [[{
      title: '../Assets/picture1.png',
    },
    {
      title: '../Assets/picture1.png',
    },
    {
      title: '../Assets/picture1.png',
    },]],
  },
  {
    title: 'NEW SELLER PRODUCT',
    data: [[{
      title: '../Assets/picture1.png',
    },
    {
      title: '../Assets/picture1.png',
    },
    {
      title: '../Assets/picture1.png',
    },]],
  },
];
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DATA: []
    };
  }
  componentDidMount() {
    this.apiValidation()
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
          let temp1 = []
          let DATA = data
          // let temp = DATA.slides.map(obj => { obj
          //   // console.log(obj)
          //   // temp1.push(obj)
          // })
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
  APIfiler(data, key) {
    let image = data.filter(obj => {
      return obj.attribute_code == key
    })
    return image[0].value
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
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.9,
          shadowRadius: 3.84,
          elevation: 5
        }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
            }}
            defaultSource = {require('../Assets/placeholder.png')}
            source={{ uri: url + data.image }}
          />
        </View>
      </TouchableOpacity>
    );
  }
  Item({ data }) {
    return (
      <TouchableOpacity>
        <View style={{
          backgroundColor: 'lightblue', marginLeft: 8, marginVertical: 25, padding: 9, borderRadius: 20, minWidth: 100,
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.6,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
          <Text style={{ alignSelf: 'center', color: 'white' }}>{data.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
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
              />
            }


            <SectionList
              sections={DATA3}
              keyExtractor={(item, index) => `dashboard2_${index}`}
              renderItem={({ item }) => <Item3 title={item} />}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
              )}
            />

          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

function Item3({ title }) {
  return (
    <View style={styles.item}>
      <FlatList
        horizontal={true}
        data={title}
        renderItem={({ item }) => <Item4 title={item.title} />}
        keyExtractor={(item, index) => `dashboard4_${index}`}
        showsHorizontalScrollIndicator={false}
      // ItemSeparatorComponent={this.renderSeparator}
      />
    </View>
  );
}
function Item4({ title }) {
  return (
    <TouchableOpacity>
      <View style={{ width: 300, height: 200, flex: 1, overflow: "hidden" }}>
        <Image
          style={{}}
          defaultSource = {require('../Assets/placeholder.png')}
          source={require('../Assets/picture1.jpg')}
        />
      </View>
    </TouchableOpacity>
  );
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