import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VregisterScreen2 = (props) => {
  const { vehicles } = props.route.params; // Destructure vehicles from route params
 // Destructure vehicles from route params
  const navigation = useNavigation();

  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem('vehicles', JSON.stringify(vehicles));
      } catch (error) {
        console.error('Error storing data:', error);
      }
    };
    storeData();
  }, [vehicles]);

  return (
    < View style={{ flex: 1, backgroundColor: '#fff', marginTop: 25 }}>
      <StatusBar style='dark'/>
      <View style={{ flexDirection: 'row', backgroundColor: '#080742', padding: 15, justifyContent: 'space-between', alignItems: 'center' }}>
        <Icon name="arrow-left" size={18} color="#ffff" onPress={() => navigation.push('Vregister')} />
        <Text style={{ color: '#FF6F00', fontSize: 20 }}>HighWay Hub</Text>
        <TouchableOpacity onPress={() => navigation.push('user')}>
          <Image source={require('../assets/images/profile.jpg')} style={{ width: 30, height: 30, borderRadius: 15 }} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {vehicles.map((vehicle, index) => (
          <View key={index} style={{ alignItems: 'center', marginTop: 20, marginBottom:10 }}>
            <View style={{ backgroundColor: '#FF6F00', width: '100%', height: 35, justifyContent: 'center', marginBottom: 20 }}>
              <Text style={{ color: '#080742', fontSize: 18, alignSelf: 'center', fontWeight:'bold' }}>{vehicle.register_no}</Text>
            </View>
            <QRCode
              value={vehicle.qrData} // Use qrData property of the vehicle
              size={250}
              color='#080742'
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default VregisterScreen2;
