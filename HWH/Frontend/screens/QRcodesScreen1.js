import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView ,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import CONFIG from '../config';

export default function QRcodesScreen1() {
  const navigation = useNavigation();
  const URL = CONFIG.CONNECTION_URL;

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [Entrance, setEntrance] = useState('');
  const [Exit, setExit] = useState('');
  const [ticketAmount, setTicketAmount] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const storedVehicles = await AsyncStorage.getItem('vehicles');
        if (storedVehicles !== null) {
          setVehicles(JSON.parse(storedVehicles));
        }
      } catch (error) {
        console.error('Error retrieving vehicles:', error);
      }
    };
    fetchVehicles();
  }, []);

  const handleChangeVehicle = async (vehicle) => {
  setSelectedVehicle(vehicle);
  try {
    await AsyncStorage.setItem('selectedVehicle', JSON.stringify(vehicle));
  } catch (error) {
    console.error('Error saving selected vehicle:', error);
  }
};


  const qrData = selectedVehicle
    ? `${selectedVehicle.register_no}, ${selectedVehicle.sv}, ${Entrance}`
    : '';

  const fetchEntranceFromBackend = async () => {
    try {
      const response = await axios.post(`${URL}/vehicle/get-entrance`, { Vehicle_number: selectedVehicle.register_no },{
      timeout: 3000 // Set timeout to 3 seconds (adjust as needed)
    });
      if (response.data.isValid) {
        const fetchedEntrance = response.data.entrance;
        setEntrance(fetchedEntrance);
        await AsyncStorage.setItem('Entrance', fetchedEntrance);
        await AsyncStorage.setItem('EntranceMessage', `Your vehicle has entered the highway from ${fetchedEntrance} entrance`);  //test123
      } else {
        alert('Vehicle Not Found', 'The vehicle number is not registered.');
      }
    } catch (error) {
      alert('Your Journey Not Started.');
    }
  };

  useEffect(() => {
    if (selectedVehicle) {
      fetchEntranceFromBackend();
    }
  }, [selectedVehicle]);

  const fetchExitFromBackend = async () => {
    try {
      const response = await axios.post(`${URL}/vehicle/get-exit`, { Vehicle_number: selectedVehicle.register_no },{
        timeout: 2000 
      });
      if (response.data.isValid) {
        const fetchedExit = response.data.exit;
        setExit(fetchedExit);
        await AsyncStorage.setItem('Exit', fetchedExit);
        await AsyncStorage.setItem('EntranceMessage', ` Your vehicle has exited the highway from ${fetchedExit} exit`);  //test123
        setTimeout(async () => {
          await AsyncStorage.removeItem('EntranceMessage');
        }, 360000);
      } else {
        alert('Vehicle Not Found', 'The vehicle number is not registered.');
      }
    } catch (error) {
      alert('Welcome ! yourjourney started have a safe journey.');
    }
  };

  useEffect(() => {
    if (selectedVehicle) {
      fetchExitFromBackend();
    }
  }, [selectedVehicle]);

  const checkTicketValidity = async () => {
    try {
      const response = await axios.post(`${URL}/ticket/check-ticket`, { Entrance, Exit });
      const { isValid, amount } = response.data;
      if (isValid) {
        setTicketAmount(amount);
        await AsyncStorage.setItem('ticketAmount', amount.toString());
      } else {
        alert('Invalid Ticket', 'Please check your entrance and exit points.');
      }
    } catch (error) {
      alert('An error occurred while checking ticket validity.');
    }
  };

  useEffect(() => {
    if (Entrance && Exit) {
      checkTicketValidity();
    }
  }, [Entrance, Exit]);

  

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 25 }}>
      <StatusBar style='dark' />
      <View style={styles.header}>
        <Icon name="arrow-left" size={18} color="#ffff" onPress={() => navigation.push('Home')} />
        <Text style={styles.title}>HighWay Hub</Text>
        <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.push('user')}>
          <Image source={require('../assets/images/profile.jpg')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <View className="w-full p-1 mt-5 flex-row justify-center" style={{backgroundColor:'#FF6F00'}}>
        <Text className="text-center font-bold text-lg" style={{color:'#080742'}}>QR Codes</Text>
      </View>

      <View style={{ backgroundColor: '#E0E0E0', borderRadius: 20, alignSelf: 'center', width: 300, marginTop: 30, height:60}}>
        <Picker
          selectedValue={selectedVehicle}
          onValueChange={(itemValue, itemIndex) => handleChangeVehicle(itemValue)}
          style={{ height: 60, width: 280 }} 
        >
          <Picker.Item label="Select Vehicle" value={null} color={'gray'} />
          {vehicles.map((vehicle, index) => (
            <Picker.Item key={index} label={`${vehicle.register_no} `} value={vehicle} color="#080742"  />
          ))}
        </Picker>
      </View>



      {selectedVehicle && (
        <View style={{ marginTop: 50, alignItems: 'center' }}>
          <QRCode
            value={qrData}
            size={200}
            color='#080742'
          />
        </View>
      )}

      <Animated.Text style={{ color: '#080742', fontSize: 18, paddingTop: 30, alignSelf: 'center' }}>Entrance: {Entrance}</Animated.Text>
      <Animated.Text style={{ color: '#080742', fontSize: 18, paddingTop: 20, alignSelf: 'center' }}>Exit: {Exit}</Animated.Text>

      {ticketAmount !== null && (
        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.push('PaymentAmount')}>
          <View style={{ backgroundColor: '#080742', marginTop: 20, borderRadius: 60, alignItems: 'center', height: 40, width: 300 }}>
            <Text style={{ color: 'white', fontSize: 18, marginTop: 5, fontWeight: 'bold' }}>Continue</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#080742',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FF6F00',
    fontSize: 20,
  },
  profileIcon: {
    padding: 5,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

});

