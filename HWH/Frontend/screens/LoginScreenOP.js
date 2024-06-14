import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import Animated,{ FadeIn, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import CONFIG from '../config';

export default function LoginScreenOP() {
  const navigation = useNavigation();
  const URL = CONFIG.CONNECTION_URL;

  const [OperatorPin, setOperatorPin] = useState('');
  const [Password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  

  const handleSubmit = () => {
    axios.post(`${URL}/operator/loginOp`, {OperatorPin, Password })
      .then(result => {
       
        console.log(result);
        
       if (result.data === "Success") {
        
           setMessage('Login successful!');
          navigation.navigate('OpQrpage');
        }else {
          setMessage('Invalid credentials. Please try again.');
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={{height:'100%', width:'100%', backgroundColor:'white', marginTop:25}}>
        <ScrollView>
            <StatusBar style='dark'/>
            <Image style={{height:'130%', width:'100%',position:'absolute'}} source={require('../assets/images/background1.png')}/>

            <View style={{position:'absolute', left:'10%'}}>
                <Animated.Image style={{height:235, width:95}} source={require('../assets/images/light.png')} entering={FadeInUp.delay(200).duration(1000).springify()}/>
            </View>
            <View style={{position:'absolute', right:'10%'}} >
                <Animated.Image style={{height:175, width:70}} source={require('../assets/images/light.png')} entering={FadeInUp.delay(400).duration(1000).springify()}/>
            </View>

            <View style={{marginTop:250}} >
                <Animated.Text style={{fontSize:25, fontWeight:'bold',color:'#FF6F00',textAlign:'center'}} entering={FadeInUp.duration(1000).springify()}>Operator Login</Animated.Text>
            </View>

            <Animated.View style={{height:42, width:'90%', backgroundColor:'#D9D9D9', marginLeft:'5%',borderRadius:50, marginTop:120}} entering={FadeInDown.duration(1000).springify()}>
            <TextInput
            style={{ padding: 10, paddingLeft: 15, borderWidth: 0, borderColor: '#D9D9D9', borderRadius: 50 }}
            placeholder='Operator Pin'
            placeholderTextColor={'gray'}
            secureTextEntry={false}
            value={OperatorPin}
            onChangeText={text => setOperatorPin(text)}
          />
            </Animated.View>

            <Animated.View style={{height:42, width:'90%', backgroundColor:'#D9D9D9',marginLeft:'5%', borderRadius:50, marginTop:10}} entering={FadeInDown.delay(200).springify()}>
            <TextInput
            style={{ padding: 10, paddingLeft: 15, borderWidth: 0, borderColor: '#D9D9D9', borderRadius: 50 }}
            placeholder='Password'
            placeholderTextColor={'gray'}
            secureTextEntry={true}
            value={Password}
            onChangeText={text => setPassword(text)}
          />    
            </Animated.View>

            <Animated.View style={{height:42, width:'90%', backgroundColor:'#022043', marginLeft:'5%',borderRadius:50, marginTop:10, marginBottom:40}}  entering={FadeInDown.delay(400).springify()}>
                <TouchableOpacity onPress={handleSubmit} /*onPress={()=> navigation.push('OpQrpage')} */>
                    <Text style={{padding:7.5, paddingLeft:15, textAlign:'center', color:'white', fontSize:20}}>Login</Text>    
                </TouchableOpacity>   
            </Animated.View>
            <Text style={{ fontSize: 16, color: 'red', textAlign: 'center', marginTop: 10 }}>{message}</Text>
        </ScrollView>
    </View>
    
  )
}