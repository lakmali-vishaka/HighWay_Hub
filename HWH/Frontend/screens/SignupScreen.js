import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInUp, FadeInDown } from 'react-native-reanimated';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import CONFIG from '../config';


export default function SignupScreen() {
  const navigation = useNavigation();
  const URL = CONFIG.CONNECTION_URL;

  const [userInfo, setUserInfo] = useState({
    NIC: '',
    Mobile: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const handleEmailChange = (text) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(text)) {
      setError('Please enter a valid email address.');
    } else {
      setError('');
    }
    setUserInfo({ ...userInfo, email: text });
  };

  
  const handleNICChange = (text) => {
    const NICRegex = /^(?:\d{9}[VX]|[0-9]{12})$/;
    if (!NICRegex.test(text)) {
      setError('Please enter a valid NIC number.');
    } else {
      setError('');
    }
    setUserInfo({ ...userInfo, NIC: text });
  };
  
  const handlePasswordChange = (text) => {
    if (text.length < 8) {
      setError('Weak password');
    } else {
      setError('Strong password');
    }
    setUserInfo({ ...userInfo, password: text });
  };

  const handleMobileChange = (text) => {
    const MobileRegex = /^0\d{9}$/; // Regex to match 10 digits starting with 0
    if (!MobileRegex.test(text)) {
      setError('Please enter a valid 10-digit mobile number starting with 0.');
    } else {
      setError('');
    }
    setUserInfo({ ...userInfo, Mobile: text });
  };
  

  

 {/* const handleSubmit = async () => {
    try {
      const response = await axios.post('http:/192.168.43.116:8070/user/add', userInfo);
      setMessage('Signup successful!');
      setTimeout(() => {
        navigation.push('Login');
      }, 2000);
    } catch (error) {
      setMessage('Error signing up. Please try again.');
      console.error('Error signing up:', error);
    }
  };*/}

  const handleSubmit = async () => {
    try {
        const response = await axios.post(`${URL}/user/add`, userInfo); //http:/192.168.43.116
        setMessage('Signup successful!');
        setTimeout(() => {
            navigation.push('Login');
        }, 2000);
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error === 'User already exists') {
            setMessage('User already exists');
        } else {
            setMessage('Error signing up. Please try again.');
        }
        //console.error('Error signing up:', error);
    }
};


  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: 'white', marginTop: 25 }}>
      <ScrollView>
        <StatusBar style='dark' />
        <Image style={{ height: '100%', width: '100%', position: 'absolute' }} source={require('../assets/images/background1.png')} />

        <View style={{ position: 'absolute', left: '10%' }}>
          <Animated.Image style={{ height: 235, width: 95 }} source={require('../assets/images/light.png')} entering={FadeInUp.delay(200).duration(1000).springify()} />
        </View>
        <View style={{ position: 'absolute', right: '10%' }} >
          <Animated.Image style={{ height: 175, width: 70 }} source={require('../assets/images/light.png')} entering={FadeInUp.delay(400).duration(1000).springify()} />
        </View>

        <View style={{ marginTop: 250 }} >
          <Animated.Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FF6F00', textAlign: 'center' }} entering={FadeInUp.duration(1000).springify()}>Get Started</Animated.Text>
        </View>

        <Animated.View style={{ height: 42, width: '90%', backgroundColor: '#E0E0E0', marginLeft: '5%', borderRadius: 50, marginTop: 70 }} entering={FadeInDown.delay(200).springify()}>
          <TextInput
            style={{ padding: 10, paddingLeft: 15, borderWidth: 0, borderColor: '#E0E0E0', borderRadius: 50 }}
            placeholder='NIC'
            placeholderTextColor={'gray'}
            onChangeText={handleNICChange}
          />
        </Animated.View>
        {error && error.includes('NIC') ? <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</Text> : null}

        <Animated.View style={{ height: 42, width: '90%', backgroundColor: '#E0E0E0', marginLeft: '5%', borderRadius: 50, marginTop: 10 }} entering={FadeInDown.delay(200).springify()}>
          <TextInput
            style={{ padding: 10, paddingLeft: 15, borderWidth: 0, borderColor: '#E0E0E0', borderRadius: 50 }}
            placeholder='Mobile Number'
            placeholderTextColor={'gray'}
            onChangeText={handleMobileChange}
          />
        </Animated.View>
        {error && error.includes('Mobile') ? <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</Text> : null}

        <Animated.View style={{ height: 42, width: '90%', backgroundColor: '#E0E0E0', marginLeft: '5%', borderRadius: 50, marginTop: 10 }} entering={FadeInDown.delay(200).springify()}>
          <TextInput
            style={{ padding: 10, paddingLeft: 15, borderWidth: 0, borderColor: '#E0E0E0', borderRadius: 50 }}
            placeholder='Email'
            placeholderTextColor={'gray'}
            onChangeText={handleEmailChange}
          />
        </Animated.View>
        {error && error.includes('email') ? <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</Text> : null}

        <Animated.View style={{ height: 42, width: '90%', backgroundColor: '#E0E0E0', marginLeft: '5%', borderRadius: 50, marginTop: 10 }} entering={FadeInDown.delay(200).springify()}>
          <TextInput
            style={{ padding: 10, paddingLeft: 15, borderWidth: 0, borderColor: '#E0E0E0', borderRadius: 50 }}
            placeholder='Password'
            placeholderTextColor={'gray'}
            onChangeText={handlePasswordChange}
          />
        </Animated.View>
        <Text style={{ color: error === 'Weak password' ? 'red' : 'green', textAlign: 'center', marginTop: 10 }}>{error === 'Weak password' || error === 'Strong password' ? error : ''}</Text>

        <Animated.View style={{ height: 42, width: '90%', backgroundColor: '#080742', marginLeft: '5%', borderRadius: 50, marginTop: 10 }} entering={FadeInDown.delay(400).springify()}>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={{ padding: 7.5, paddingLeft: 15, textAlign: 'center', color: 'white', fontSize: 20 }}>SignUp</Text>
            <Text>{message}</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text style={{ fontSize: 13, color: '#000', textAlign: 'center', marginTop: 30, marginBottom: 50 }} entering={FadeInDown.delay(600).springify()}>Already have an account?  <Text style={{ fontSize: 12, color: '#FF6F00', fontWeight: 'bold' }} onPress={() => navigation.push('Login')}>Login</Text></Animated.Text>
      </ScrollView>
    </View>
  );
}