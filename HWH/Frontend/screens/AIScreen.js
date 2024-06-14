import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import React from 'react'
import {Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { TextInput } from 'react-native/types';


export default function AIScreen() {
    const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View className="h-full" style={{backgroundColor:'white' ,marginTop:25}}>
      <View className="bg-blue-950 w-full p-4 absolute flex-row justify-between" style={{backgroundColor:'#080742'}}>
        <Icon name="arrow-left" size={18} color="#ffff" className="pt-1.5" onPress={()=> navigation.push('Home')}/>
        <Text className=" text-xl" style={{color:'#FF6F00', left:-100}}>   HigWay Hub</Text>
      </View>
  
      <View className="w-full p-1 mt-20 flex-row justify-center" style={{backgroundColor:'#FF6F00',marginTop:75}}>
        <Text className="text-center font-bold text-lg" style={{color:'#080742'}}>AI Help Assistant</Text>
      </View>

      <View style={styles.Edit}>
        <Image style={styles.image1} source={require('../assets/images/AI.png')}/>
        <View style={{paddingTop:30  }}>
          <Text style={styles.Texttt}>Hi, how can i help you?</Text>
        </View>
      </View>

     
      <View style={styles.TextBox}>
        <TextInput style={styles.input}>Type here...</TextInput>
      </View>
      

    </View>
    </ScrollView>
  
  )
}

const styles=StyleSheet.create({
    Edit:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginTop:10
      },

      image2:{
        width:10,
        height:10,
        paddingTop:20,
        paddingRight:25
      },

      EditC:{
        color:'white',
        
        
        
      },

      image1:{
        width:50,
        height:50,
        margin:15,
        
    
      },
      Texttt:{
        backgroundColor:'#E0E0E0',
        paddingLeft:15,
        paddingRight:15,
        padding:6,
        borderRadius:20
        
      },

      TextBox:{
        width:'80%',
        padding:5,
        backgroundColor:'#E0E0E0',
        marginTop:50,
        marginLeft:'5%',
        borderRadius:20
      },

      input:{
        marginLeft:10,
        color:'#080742'
      },

})