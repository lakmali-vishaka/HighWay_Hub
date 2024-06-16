import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CONFIG from '../config';


export default function OpQrScreen2() {
  const navigation = useNavigation();
  const URL = CONFIG.CONNECTION_URL;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  const [Entrance, setEntrance] = useState('');
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');



  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setText(data);

    try {
      console.log('Received data:', data);

      const [qrData, type] = data.split(',').map(part => part.trim()); // Remove leading and trailing whitespace
      
      const response = await fetch(`${URL}/vehicle/compare-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrData, type }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      
      if (response.status === 200) {
        const existsInDatabase = responseData.exists;
        if (existsInDatabase) {
          console.log('Data exists in the database');
          // Data exists, perform necessary actions
          setUserData({ qrData, type });
        } else {
          console.log('Data does not exist in the database');
          // Data does not exist, handle accordingly
        }
      } else {
        console.log('Error in server response');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleGateChange = (Entrance_gate) => {
    setEntrance(Entrance_gate);
    if (!userData) {
      console.error('User data not available');
      return;
    }

    fetch(`${URL}/vehicle/store-gate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Entrance_gate, ...userData }), // Send selected gate along with user data
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(responseData => {
      console.log(responseData); // Log the response from the backend
      setMessage('User data stored successfully');
      AsyncStorage.setItem('Entrance', Entrance_gate);
      navigation.navigate('OpQrpage');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };


  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={askForCameraPermission} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white' , marginTop:25 }}>
      <StatusBar style='dark'/>
      {/* Your header component */}
      <View style={styles.header}>
          <Icon name="arrow-left" size={18} color="#ffff" onPress={() => navigation.push('OpQrpage')} />
          <Text style={styles.title}>HighWay Hub</Text>
          <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.push('user')}>
            <Image source={require('../assets/images/profile.jpg')} style={styles.profileImage} />
          </TouchableOpacity>
        </View>

      <View style={{ marginTop: -15, alignItems: 'center' }}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 500, width: 300 }} />
        </View>
        <Text style={styles.maintext}>{text}</Text>
        {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='#080742' />}
        
      </View>

      <View style={styles.pickerContainer}>
        {/* Dropdown menu for selecting gate */}
        <Picker
          style={styles.picker}
          //onValueChange={(itemValue) => console.log(itemValue)}
          //selectedValue={selectedGate}
          selectedValue={Entrance}
          onValueChange={(itemValue) => handleGateChange(itemValue)}
          
        >
          <Picker.Item label="Select gate" value="" color={'gray'} />
          <Picker.Item label="Imaduwa" value="imaduwa" color='#002043' /> 
          <Picker.Item label="Pinnaduwa" value="pinnaduwa" color='#002043' />
          <Picker.Item label="Kokmaduwa" value="kokmaduwa" color='#002043' />
        
        </Picker>
      </View>
    

      {/* Display message */}
      {message !== '' && (
  <View style={[styles.messageContainer, { alignItems: 'center' }]}>
    <Text style={[styles.messageText, { color: 'red' }]}>{message}</Text>
  </View>
)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 270,
    width: 300,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#080742',
    marginTop: 80,
  },
  pickerContainer: {
    backgroundColor: '#E0E0E0',
    width: 300,
    marginTop: 50,
    alignSelf: 'center',
    borderRadius: 20,
    height: 60,
  },
  picker: {
    height: 60,
    width: 280,
    alignSelf: 'center',
    //marginTop: 20,
  },
});
