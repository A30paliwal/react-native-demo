import React, {Component} from 'react'
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
const DATA = [
    {
        title: 'MEN',
    },
    {
        title: 'WOMEN',
    },
    {
        title: 'GEAR',
    },
    {
        title: 'COLLECTION',
    },
    {
        title: 'PLATINUM',
    },
    {
        title: 'TITANIUM',
    },
  ];
  const DATA2 = [
    {
      title: '../Assets/picture1.png',
    },
    {
      title: '../Assets/picture1.png1',
    },
    {
      title: '../Assets/picture1.png1',
    },
  ];
  const DATA3 = [
    {
      title: 'FEATURED CATEGORIES',
      data:[ [{
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
export default class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state= {};
  }

render(){
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}
                        keyboardShouldPersistTaps='handled'
                        alwaysBounceVertical={false}>
                <View>
                <FlatList
                    horizontal={true}
                    data={DATA}
                    renderItem={({ item }) => <Item title={item.title} />}
                    keyExtractor={(item, index) => `dashboard_${index}`}
                    showsHorizontalScrollIndicator={false}
                />
                <FlatList
                    pagingEnabled
                    alwaysBounceHorizontal={false}
                    horizontal={true}
                    data={DATA2}
                    renderItem={({ item }) => <Item2 title={item.title} />}
                    keyExtractor={(item, index) => `dashboard1_${index}`}
                    showsHorizontalScrollIndicator={false}
                />

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
        )}
}
function Item({ title }) {
    return (
        <TouchableOpacity>
        <View style={{backgroundColor:'lightblue',marginLeft:8,marginVertical:25,padding:9,borderRadius:20,minWidth:100,
                shadowColor: "black",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.6,
                shadowRadius: 3.84,
                elevation: 5,
                }}>
            <Text style={{alignSelf:'center',color:'white'}}>{title}</Text>
        </View>
        </TouchableOpacity>
    );
}
function Item2({ title }) {
    return (
        <TouchableOpacity 
          activeOpacity={1}
          style={{backgroundColor:'#fff',
          width:Dimensions.get('window').width,
          height:Dimensions.get('window').width/1.39,
          padding:10,
          }}>
            <View style={{
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity: 0.9,
                      shadowRadius: 3.84,
                      elevation:5
                    }}>
                    <Image
                    style={{width:'100%',
                            height:'100%',
                            borderRadius:10,
                            }}
                    source={require('../Assets/picture1.jpg')}
                    />
                    </View>
        </TouchableOpacity>
    );
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
        {/* <Text style={styles.title}>{title}</Text> */}
      </View>
    );
  }
function Item4({ title }) {
    return (
        <TouchableOpacity>
            <View style={{width:300,height:200,flex:1,overflow:"hidden"}}>
                    <Image
                    style={{}}

                    source={require('../Assets/picture1.jpg')}
                    />
            </View>
        </TouchableOpacity>
    );
}
const styles = {
    container: {
        flexGrow:1,
        backgroundColor: "#ffffff",
    },
    item: {
        backgroundColor: '#0005',
    },
    header: {
        fontSize: 16,
    },
}