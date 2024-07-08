import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View,Pressable, Image, FlatList, TouchableOpacity, } from 'react-native';
import {Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated,{ FadeIn, FadeInUp, FadeInDown } from 'react-native-reanimated';


export default function OPProfileScreen() {
    const navigation = useNavigation();

return (
    
<Pressable style={({pressed})=>pressed && styles.pressItem} >

    <View>

      <View style={{padding:20,paddingTop:20, backgroundColor:'#080742', marginTop:25}}>
        <TouchableOpacity style={styles.Edit0} onPress={()=>console.log("Button Click")}>
          <Icon name="arrow-left" size={18} color="#ffff" className="pt-1" onPress={()=> navigation.push('OpQrpage')}/>
        </TouchableOpacity>
          
        <View style={{display:'flex',justifyContent:'center',alignItems:'center',padding:5,}}>
          <Image style={styles.image1} source={require('../assets/images/ope.jpg')}/>
          <Text style={styles.EditC}>-Operator ID-</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.Edit} onPress={()=>console.log("Button Click")}>
        <Icon name="book" size={18} color="#FF6F00"/>
        <Text  style={styles.text3}> Transaction Records</Text>
      </TouchableOpacity>

      <Animated.View style={{alignItems:'center', marginTop:150}} entering={FadeInDown.delay(800).duration(1000).springify()}>
        <TouchableOpacity style={{padding:20}} onPress={()=> navigation.push('Begin')}>
          <View style={{backgroundColor: '#080742',marginTop:100,borderRadius:60,alignItems:'center',height:40,width:300}}>
              <Text style={{color:'white',fontSize:18,marginTop:5,fontWeight:'bold'}}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>

</Pressable>
    
  );


}

const styles=StyleSheet.create({
  text3:{
    marginLeft:25,
    marginTop:0,
    fontSize:18
  },

  text4:{
    marginLeft:45,
    marginTop:20,
    fontSize:18
  },

  Edit0:{
    flexDirection:'row',
    justifyContent:'flex-start',
  },

  Edit:{
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:50,
    marginLeft:40
  },

  Edit2:{
    flexDirection:'row',
    justifyContent:'space-between',
  },

  Edit1:{
    borderWidth:1,
    borderColor:'#ffffff',
    padding:3,
    borderRadius:10,
    marginBottom:20
  },

  EditC:{
    color:'white'
  },

  EditD:{
    color:'white',
    textAlign:'center'
  },

  Edit2:{
    flexDirection:'row',
    justifyContent:'space-between'
  },

  pressItem:{
    opacity:0.5
  },

  logout:{
    justifyContent:'space-between',
  },

  marginl:{
    padding:15,
    marginTop:180,
    borderRadius:99,
    backgroundColor:'#080742',
    textAlign:'center',
    color:'White'
  },

  image1:{
    width:100,
    height:100,
    margin:20,
    borderRadius:90
  },

  image2:{
    width:10,
    height:10,
    paddingTop:20,
    paddingRight:25
  },

  image3:{
    width:50,
    height:50,
    paddingBottom:5,
    marginTop:20, 
  },

  image4:{
    width:35,
    height:35,
    paddingBottom:5,
    marginTop:20,
  }
})
