import { View, Text, StyleSheet, Image,Button, TextInput, SafeAreaView, TouchableOpacity,ScrollView ,styles} from 'react-native'
import React, { useState, useEffect } from "react";
import {Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated,{ FadeIn, FadeInUp, FadeInDown } from 'react-native-reanimated';
import axios from 'axios';
import CONFIG from '../config';


export default function EditProfileScreen() {
  const navigation = useNavigation();
  const URL = CONFIG.CONNECTION_URL;

  const [updatedUser, setUpdatedUserData] = useState({
      NIC: '',
      Mobile: '',
      password: ''
  });
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');

  // Fetch userId from session or wherever it's stored
  useEffect(() => {
      const userIdFromSession = ''; // Implement logic to retrieve userId
      setUserId(userIdFromSession);
  }, []);

  // Function to handle save operation
  const handleSave = async () => {
      try {
          // Include userId in updatedUser data
          const updatedUserDataWithUserId = { ...updatedUser, userId };

          // Send request with updatedUser data
          const response = await axios.post(`${URL}/user/update`, updatedUserDataWithUserId, {
              withCredentials: true // Send session cookie with the request
              
          });

          //setMessage('Update successful!');

          console.log('Response from backend:', response.data);
          setMessage(response.data.message);
          
          setTimeout(() => {
            setMessage('');
              navigation.push('user');
          }, 3000);
      } catch (error) {
          setMessage('Error in update. Please try again.');
          console.error('Error update:', error);
      }
  };

  return (
    < View style={{height:'100%', width:'100%', marginBottom:50}}>
      
      <View style={{backgroundColor:'#fff',marginTop:25}}>
        <View className="bg-blue-950 w-full p-4 absolute flex-row justify-between" style={{backgroundColor:'#080742'}}>
          <Icon name="arrow-left" size={18} color="#ffff" className="pt-1" onPress={()=> navigation.push('user')}/>
          <Text className="text-center font-bold text-xl" style={{color:'#FF6F00',marginRight:93}}>  HighWay Hub</Text>
        </View>

        <View className="bg-orange-400 w-full p-1 mt-20 flex-row justify-center" style={{backgroundColor:'#FF6F00', marginTop:75}}>
          <Text className="text-blue-950 text-center font-bold text-lg" style={{color:'#080742'}}>Edit Profile</Text>
        </View>
      </View>
      
      <ScrollView>
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Text style={{paddingTop:15,paddingLeft:10}}>Add a Profile Picture: </Text>
          <View>
            <TouchableOpacity style={{display:'flex',justifyContent:'center',alignItems:'center',padding:5,}} onPress={()=>console.log("Button Click")}>
              <Image style={{width:150,height:130, margin:15, paddingTop:25}} source={require('../assets/images/L.png')}/>
            </TouchableOpacity>
          </View>
        </Animated.View>
          
          <Animated.View entering={FadeInDown.delay(400).springify()}>
            <View style={{paddingLeft:10}}>
              <Text>Change your NIC:</Text>
            </View>
            <View style={{backgroundColor:'#E0E0E0', width:300,height:40, margin:15,padding:10,marginLeft:30,borderRadius:25,  }}>
            <TextInput 
            value={updatedUser.NIC} 
            onChangeText={(NIC) => setUpdatedUserData({ ...updatedUser, NIC })} 
            placeholder="NIC"
            style={{marginLeft:15}}
            />
            </View>
          </Animated.View>


          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <View style={{paddingLeft:10}}>
              <Text>Change your Mobile Number:</Text>
            </View>
            <View style={{backgroundColor:'#E0E0E0', width:300,height:40, margin:15,padding:10,marginLeft:30,borderRadius:25, }}>
            <TextInput 
            value={updatedUser.Mobile} 
            onChangeText={(Mobile) => setUpdatedUserData({ ...updatedUser, Mobile })} 
            placeholder="Mobile"
            style={{marginLeft:15}}
            />
            </View>
          </Animated.View>


          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <View style={{paddingLeft:10}}>
              <Text>Change your Password :</Text>
            </View>
            <View style={{backgroundColor:'#E0E0E0', width:300,height:40, margin:15,padding:10,marginLeft:30,borderRadius:25, }}>
            <TextInput 
            value={updatedUser.password} 
            onChangeText={(password) => setUpdatedUserData({ ...updatedUser, password })} 
            placeholder="Password"
            style={{marginLeft:15}}
            />
            </View>
          </Animated.View>



          
      <Animated.View style={{alignItems:'center', marginTop:80}} entering={FadeInDown.delay(800).duration(1000).springify()}>
      <TouchableOpacity style={{padding:20}} onPress={handleSave}>
          <View style={{backgroundColor: '#080742',marginTop:-60,borderRadius:60,alignItems:'center',height:40,width:300}}>
              <Text style={{color:'white',fontSize:18,marginTop:5,fontWeight:'bold'}}>Save</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <Text style={{ color: 'red', textAlign: 'center', fontSize: 18, }}>{message}</Text>
 

      </ScrollView>
      
    </View>
    

  )
}


/*<Animated.View style={{height:45, width:'90%', backgroundColor:'#022043', marginLeft:'5%',borderRadius:50, top:70}}  entering={FadeInDown.delay(800).springify()}>
            <TouchableOpacity onPress={()=> navigation.push('user')}>
                <Text style={{padding:7.5, paddingLeft:15, textAlign:'center', color:'white', fontSize:18}}>Save</Text>    
            </TouchableOpacity>   
  </Animated.View>*/

 /*const styles=StyleSheet.create({
    EditC:{
        color:'white'
      },

      Edit:{
        flexDirection:'row',
        justifyContent:'flex-start',
      },

      TextSpace1:{
        paddingTop:15,
        paddingLeft:10
        

    },

    image1:{
        width:150,
        height:130,
        margin:15,
        paddingTop:25
    
      },


      image2:{
        width:10,
        height:10,
        paddingTop:20,
        paddingRight:25
      },

    
      marginl:{
       
            padding:10,
            margin:25,
            marginTop:40,
            borderRadius:88,
            backgroundColor:'#080742',
              textAlign:'center',
              color:'White'
      },

      margin2:{
        padding:30
      }
      

})*/