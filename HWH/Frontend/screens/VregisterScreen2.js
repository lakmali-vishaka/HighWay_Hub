import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet,Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VregisterScreen2 = (props) => {
  const [vehicles, setVehicles] = useState([]); 
  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const storedVehicles = await AsyncStorage.getItem('vehicles');
        if (storedVehicles) {
          setVehicles(JSON.parse(storedVehicles));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchVehicles();
  }, []);

  const confirmDelete = (index) => {
    Alert.alert(
      "Delete Vehicle",
      "Are you sure you want to delete this vehicle?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => deleteVehicle(index)
        }
      ]
    );
  };

  const deleteVehicle = async (index) => {
    const updatedVehicles = vehicles.filter((_, i) => i !== index);
    setVehicles(updatedVehicles);
    await AsyncStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
  };

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
              <Text style={{ color: '#080742', fontSize: 18, alignSelf: 'center', fontWeight:'bold' }}>{vehicle.register_no} - {vehicle.sv}</Text>
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

const styles = StyleSheet.create({
  
  deleteButton: {
    marginRight: 10,
    width:20,
    height:20,
    borderRadius: 5,
    position:'absolute',
    right:0,
    backgroundColor:'#080742',
    borderRadius:20
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center'
  },
});
export default VregisterScreen2;
