import * as React from 'react';
import { Text, View, StyleSheet, Image,TextInput,TouchableOpacity,FlatList, Dimensions ,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';
 

export default class Wishlist extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
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
      ),
    };
  };

  render() {
    return (
        <View>
            <Text>Hello</Text>
        </View>
    );
}

}
