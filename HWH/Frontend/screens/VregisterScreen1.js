import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config';

const VregisterScreen1 = () => {
  const [vehicles, setVehicles] = useState([{ register_no: '', sv: '' }]);
  const [nic, setNic] = useState(''); //HFB
  const navigation = useNavigation();
  const URL = CONFIG.CONNECTION_URL;

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchNic = async () => {
      const storedNic = await AsyncStorage.getItem('userNIC');
      if (storedNic) setNic(storedNic);
    };

    fetchNic();
  }, []);
  

  const handleChange = (index, key, value) => {
    const updatedVehicles = [...vehicles];
    updatedVehicles[index][key] = value;
    setVehicles(updatedVehicles);
    
  };

  const addVehicle = () => {
    if (vehicles.length < 5) {
      setVehicles([...vehicles, { register_no: '', sv: '' }]);
    } else {
      alert('Maximum Vehicles Reached', 'You can only add up to 5 vehicles.');
    }
  };
  
  const handleSubmit = async () => {
    try {
      const storedVehicles = await AsyncStorage.getItem('vehicles');
      const existingVehicles = storedVehicles ? JSON.parse(storedVehicles) : [];

      if (existingVehicles.length + vehicles.length > 15) {
        setError('You can only register up to 15 vehicles.');
        return;
      }

      const newVehicles = await Promise.all(vehicles.map(async (vehicle) => {
        const { register_no, sv } = vehicle;
        if (!register_no || !sv) {
          setError('Please fill in all the fields.');
          return null;
        }

        const qrData = `${register_no}, ${sv}`;
        vehicle.qrData = qrData;

        const vehicleInfo = {
          Vehicle_number: register_no,
          Type: sv,
          NIC: nic,
        };
        const response = await axios.post(`${URL}/vehicle/addVehicle`, vehicleInfo);
        return { ...vehicle, ...vehicleInfo };
      }));

      const updatedVehicles = [...existingVehicles, ...newVehicles.filter(Boolean)];
      await AsyncStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
      setMessage('Register successful!');
      setTimeout(() => {
        navigation.push('vregister1', { vehicles: updatedVehicles });
      }, 2000);
    } catch (error) {
      setMessage('Error in Registration. Please try again.');
      console.error('Error:', error);
    }
  };

  {/*const handleSubmit = async () => {
    try {
      const promises = vehicles.map(async (vehicle) => {
        const { register_no, sv } = vehicle;
        if (!register_no || !sv) {
          setError('Please fill in all the fields.');
          return;
        }
  
        // Include register_no and sv in the QR code data
        const qrData = ` ${register_no}, ${sv}`;
  
        // Set the qrData property in the vehicle object
        vehicle.qrData = qrData;
  
        const vehicleInfo = {
          Vehicle_number: register_no,
          Type: sv,
          NIC: nic, //HFB
        
        };
        const response = await axios.post(`${URL}/vehicle/addVehicle`, vehicleInfo);
        return response.data;
      });
  
      const results = await Promise.all(promises);
      setMessage('Register successful!');
      setTimeout(() => {
        navigation.push('vregister1', { vehicles: vehicles });
      }, 2000);
    } catch (error) {
      setMessage('Error in Registration. Please try again.');
      console.error('Error:', error);
    }
    
  };
*/}
  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' , marginTop:25}}>
        <StatusBar style='dark'/>
        <View style={styles.header}>
          <Icon name="arrow-left" size={18} color="#ffff" onPress={() => navigation.push('Home')} />
          <Text style={styles.title}>HighWay Hub</Text>
          <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.push('user')}>
            <Image source={require('../assets/images/profile.jpg')} style={styles.profileImage} />
          </TouchableOpacity>
        </View>

        <View className="w-full p-1 mt-5 flex-row justify-center" style={{backgroundColor:'#FF6F00'}}>
          <Text className="text-center font-bold text-lg" style={{color:'#080742'}}>Vehicle Registration</Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <Icon name='car' size={150} color={'#080742'} />
        </View>

        {vehicles.map((vehicle, index) => (
          <View key={index}>
            {index > 0 && (
              <View style={{ alignItems: 'center', marginTop: 60 }}>
                <Text className="text-center font-bold text-lg" style={{color:'#080742'}}>Next Vehicle</Text>
              </View>
            )}


              <View style={{ backgroundColor: '#E0E0E0', padding: 10, borderRadius: 20, alignSelf: 'center', marginTop: 40, width: 300,paddingLeft:25 }}>
                <TextInput
                  placeholder='Register Number'
                  placeholderTextColor={'gray'}
                  onChangeText={(value) => handleChange(index, 'register_no', value)}
                  style={{fontSize:15, color:'#080742'}}
                />
              </View>

              <View style={{ backgroundColor: '#E0E0E0', borderRadius: 20, alignSelf: 'center', width: 300, marginTop: 30, height:60 }}>
                <Picker
                  selectedValue={vehicle.sv}
                  onValueChange={(value) => handleChange(index, 'sv', value)}
                  style={{ height: 60, width: 280, }}
                >
                  <Picker.Item label="Select Type" value="" color={'gray'} />
                  <Picker.Item label="Type 1" value="type 1" color='#080742' />
                  <Picker.Item label="Type 2" value="type 2" color='#080742' />
                  <Picker.Item label="Type 3" value="type 3" color='#080742' />
                </Picker>
              </View>
            </View>
        ))}

        <TouchableOpacity onPress={addVehicle} style={{ backgroundColor: '#080742', borderRadius: 60, paddingVertical: 10, paddingHorizontal: 20, marginTop: 50, width: 300 ,alignSelf:'center'}}>
          <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>Add Vehicle</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#080742', borderRadius: 60, paddingVertical: 10, paddingHorizontal: 20, marginTop: 20,marginBottom:20, width: 300,alignSelf:'center'}}>
          <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>Register All Vehicles</Text>
        </TouchableOpacity>

        
        
      </View>
    </ScrollView>
  );
};

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

export default VregisterScreen1;

