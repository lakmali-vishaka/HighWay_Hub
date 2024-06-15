//require("dotenv").config(); 
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config';


export default function LoginScreen() {
  const navigation = useNavigation();
  const URL = CONFIG.CONNECTION_URL;

  const [NIC, setNIC] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  

  /*const handleSubmit = () => {
  axios.post('http://192.168.43.116:8070/user/login', { NIC, password })
    .then(response => {
      console.log(response);
      if (response.data.error) {
        setMessage('Invalid credentials. Please try again.');
      } else {
        // Assuming the response contains user data
        const userData = response.data;
        setMessage('Login successful!');
        // Now you can navigate to the Home screen or handle the user data as needed
        navigation.navigate('Home', { userData });
      }
    })
    .catch(err => console.log(err));
};
*/

//HFB
const handleSubmit = async () => {
  try {
    const result = await axios.post(`${URL}/user/login`, { NIC, password });

    console.log(result);

    if (result.data === "Success") {
      setMessage('Login successful!');
     // await AsyncStorage.setItem('userNIC', NIC); // Save NIC to AsyncStorage
      navigation.navigate('Home');
    } else {
      setMessage('Invalid credentials. Please try again.');
    }
  } catch (err) {
    console.log(err);
  }


//new
useEffect(() => {
    const getStoredData = async () => {
      try {
        const storedNIC = await AsyncStorage.getItem('NIC');
        //const storedAge = await AsyncStorage.getItem('age');
        if (storedNIC) setNIC(storedNIC);
        //if (storedAge) setAge(storedAge);
      } catch (error) {
        console.log('Failed to retrieve data from storage', error);
      }
    };

    getStoredNIC();
  }, []);

  //const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem('NIC', NIC);
      //await AsyncStorage.setItem('age', age);
    } catch (error) {
      console.log('Failed to save data to storage', error);
    }};
  //};
//HFB

  {/*const handleSubmit = () => {
    axios.post(`${URL}/user/login`, { NIC, password }) //http:/192.168.43.116:8070/user/login
      .then(result => {
       
        console.log(result);
        
       if (result.data === "Success") {
        
          setMessage('Login successful!');
          navigation.navigate('Home');
          
        }else {
          setMessage('Invalid credentials. Please try again.');
        }
      })
      .catch(err => console.log(err));
  };*/}

 
  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: 'white', marginTop: 25 }}>
      <ScrollView>
        <StatusBar style='dark' />
        <Image style={{ height: '115%', width: '100%', position: 'absolute' }} source={require('../assets/images/background1.png')} />

        <View style={{ position: 'absolute', left: '10%' }}>
          <Animated.Image style={{ height: 235, width: 95 }} source={require('../assets/images/light.png')} entering={FadeInUp.delay(200).duration(1000).springify()} />
        </View>
        <View style={{ position: 'absolute', right: '10%' }} >
          <Animated.Image style={{ height: 175, width: 70 }} source={require('../assets/images/light.png')} entering={FadeInUp.delay(400).duration(1000).springify()} />
        </View>

        <View style={{ marginTop: 250 }} >
          <Animated.Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FF6F00', textAlign: 'center' }} entering={FadeInUp.duration(1000).springify()}>Welcome Back!</Animated.Text>
        </View>

        <Animated.View style={{ height: 42, width: '90%', backgroundColor: '#E0E0E0', marginLeft: '5%', borderRadius: 50, marginTop: 120 }} entering={FadeInDown.duration(1000).springify()}>
          <TextInput
            style={{ padding: 10, paddingLeft: 15, borderWidth: 0, borderColor: '#E0E0E0', borderRadius: 50 }}
            placeholder='NIC'
            placeholderTextColor={'gray'}
            value={NIC}
            onChangeText={text => setNIC(text)}
          />
        </Animated.View>
        <Animated.View style={{ height: 42, width: '90%', backgroundColor: '#E0E0E0', marginLeft: '5%', borderRadius: 50, marginTop: 10 }} entering={FadeInDown.delay(200).springify()}>
          <TextInput
            style={{ padding: 10, paddingLeft: 15, borderWidth: 0, borderColor: '#E0E0E0', borderRadius: 50 }}
            placeholder='Password'
            placeholderTextColor={'gray'}
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </Animated.View>

        <Animated.View style={{ height: 42, width: '90%', backgroundColor: '#080742', marginLeft: '5%', borderRadius: 50, marginTop: 10 }} entering={FadeInDown.delay(400).springify()}>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={{ padding: 7.5, paddingLeft: 15, textAlign: 'center', color: 'white', fontSize: 20 }}>Login</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={{ fontSize: 16, color: 'red', textAlign: 'center', marginTop: 10 }}>{message}</Text>

        <Animated.Text style={{ fontSize: 13, color: '#000', textAlign: 'center', marginTop: 30, marginBottom: 50 }} entering={FadeInDown.delay(600).springify()}>Don't have an account?  <Text style={{ fontSize: 12, color: '#FF6F00', fontWeight: 'bold' }} onPress={() => navigation.push('SignUp')}>SignUp</Text></Animated.Text>
      </ScrollView>
    </View>
  );
}
