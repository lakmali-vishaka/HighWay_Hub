import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';


export default function OpQrScreen1() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(''); // State to store selected option

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleScanQR = () => {
    if (selectedOption === 'Operator in Entrance') {
      navigation.push('qr2'); // Navigate to qr2 screen if option is "Operator in Entrance"
    } else if (selectedOption === 'Operator in Exit') {
      navigation.push('OpExit'); // Navigate to OpExit screen if option is "Operator in Exit"
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' , flex:1, marginTop:25}}>
      <StatusBar style='dark'/>
      <View style={{ flexDirection: 'row', backgroundColor: '#080742', padding: 15, justifyContent: 'space-between', alignItems: 'center' }}>
        <Icon name="arrow-left" size={18} color="#ffff" onPress={() => navigation.push('OPLogin')} />
        <Text style={{ color: '#FF6F00', fontSize: 20 }}>HighWay Hub</Text>
        <TouchableOpacity onPress={() => navigation.push('operator')}>
          <Image source={require('../assets/images/profile.jpg')} style={{ width: 30, height: 30, borderRadius: 15 }} />
        </TouchableOpacity>
      </View>

      {/* Dropdown menu for selecting option */}
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedOption}
          onValueChange={(itemValue) => handleOptionChange(itemValue)}
        >
          <Picker.Item label="Select Gate Type" value="" color={'gray'} />
          <Picker.Item label="Operator at Entrance" value="Operator in Entrance" color='#080742' />
          <Picker.Item label="Operator at Exit" value="Operator in Exit" color='#080742' />
        </Picker>
      </View>

      <TouchableOpacity style={styles.scanButton} onPress={handleScanQR}>
        <View style={styles.scanButtonContent}>
          <Icon name="qrcode" size={20} color={'gray'} style={styles.qrIcon} />
          <Text style={styles.scanButtonText}>Scan QR Code</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.bottomLogoContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.bottomLogo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#080742',
    padding: 10,
  },
  headerText: {
    color: '#FF6F00',
    fontWeight: 'bold',
    fontSize: 20,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  pickerContainer: {
    backgroundColor: '#E0E0E0',
    width: 300,
    marginTop: 80,
    alignSelf: 'center',
    borderRadius: 20,
    height: 60,
   
  },
  picker: {
    height: 60,
    width: 280,
    alignSelf: 'center',
  },
  scanButton: {
    height: 80,
    width: 300,
    marginTop: 20,
    alignSelf: 'center',
  },
  scanButtonContent: {
    backgroundColor: '#E0E0E0',
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrIcon: {
    marginRight: 10,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  bottomLogoContainer: {
    backgroundColor: '#080742',
    height: 130,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLogo: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});