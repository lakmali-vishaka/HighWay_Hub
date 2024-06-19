import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MarqueeText from 'react-native-marquee';


export default function ResentTiket14() {
  const navigation = useNavigation();
  const [P, setP] = useState('');
  const [p2, setP2] = useState('');
  const [Entrance, setEntrance] = useState('');
  const [Exit, setExit] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [ticketTime, setTicketTime] = useState('');
  //const [currentTime, setCurrentTime] = useState('');
  const [ticketAmount, setTicketAmount] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [marqueeColor, setMarqueeColor] = useState('#000');


  {/*useEffect(() => {
    const getData = async () => {
      try {
        const storedP = await AsyncStorage.getItem('P');
        const storedP2 = await AsyncStorage.getItem('p2');
        if (storedP !== null && storedP2 !== null) {
          setP(storedP);
          setP2(storedP2);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
    getData();
  }, []);*/}

  useEffect(() => {
    const fetchSelectedVehicle = async () => {
      try {
        const storedVehicle = await AsyncStorage.getItem('selectedVehicle');
        if (storedVehicle !== null) {
          setSelectedVehicle(JSON.parse(storedVehicle));
        }
      } catch (error) {
        console.error('Error retrieving selected vehicle:', error);
      }
    };
    fetchSelectedVehicle();
  }, []);

  useEffect(() => {
    const fetchEntrance = async () => {
      try {
        const storedEntrance = await AsyncStorage.getItem('Entrance');
        setEntrance(storedEntrance || '');
      } catch (error) {
        console.error('Error fetching entrance:', error);
      }
    };
    fetchEntrance();
  }, []);

  useEffect(() => {
    const fetchExit = async () => {
      try {
        const storedExit = await AsyncStorage.getItem('Exit');
        setExit(storedExit || '');
      } catch (error) {
        console.error('Error fetching exit:', error);
      }
    };
    fetchExit();
  }, []);

  ///////////////
  {/*useEffect(() => {
    const fetchCurrentDate = () => {
      const now = new Date();
      const date = now.toDateString();
      setCurrentDate(date);
    };
    fetchCurrentDate();
  }, []);*/}

  useEffect(() => {
    const fetchTicketTime = async () => {
      try {
        const storedTicketTime = await AsyncStorage.getItem('ticketTime');
        setTicketTime(storedTicketTime || '');
      } catch (error) {
        console.error('Error fetching ticket time:', error);
      }
    };
    fetchTicketTime();
  }, []);

  //////////////

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toDateString();
      //const time = now.toLocaleTimeString();
      setCurrentDate(date);
      //setCurrentTime(time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTicketAmount = async () => {
      try {
        const storedTicketAmount = await AsyncStorage.getItem('ticketAmount');
        if (storedTicketAmount !== null) {
          setTicketAmount(storedTicketAmount);
          
          // Set timeout to clear ticketAmount after 3 minutes
          {/*
          setTimeout(async () => {
            await AsyncStorage.removeItem('ticketAmount');
            setTicketAmount(null);
          }, 180000); // 3 minutes in milliseconds*/}
        }
      } catch (error) {
        console.error('Error fetching ticket amount:', error);
      }
    };

    fetchTicketAmount();
  }, []);

  {/* useEffect(() => {
    // Set timeout to clear Entrance after 3 minutes
    setTimeout(async () => {
      await AsyncStorage.removeItem('Entrance');
      setEntrance('');
    }, 180000); // 3 minutes in milliseconds
  }, []);

 useEffect(() => {
    // Set timeout to clear Exit after 3 minutes
    setTimeout(async () => {
      await AsyncStorage.removeItem('Exit');
      setExit('');
    }, 180000); // 3 minutes in milliseconds
  }, []);
*/}
  useEffect(() => {
    const getMarqueeColor = () => {
      const day = new Date().getDay();
      const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE']; // Colors for Sunday to Saturday
      setMarqueeColor(colors[day]);
    };

    getMarqueeColor();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.header}>
        <Icon name="arrow-left" size={18} color="#ffff" onPress={() => navigation.push('Home')} />
        <Text style={styles.title}>     HighWay Hub</Text>
        <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.push('user')}>
          <Image source={require('../assets/images/profile.jpg')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <View className="w-full p-1 mt-5 flex-row justify-center" style={{backgroundColor:'#FF6F00'}}>
        <Text className="text-center font-bold text-lg" style={{color:'#080742'}}>Recent Ticket</Text>
      </View>
      <View style={{marginLeft:15, marginRight:15}}>
        <MarqueeText style={[styles.marquee, { color: marqueeColor }]} duration={5000} loop>
          SOUTHERN EXPRESSWAY [{currentDate}] SOUTHERN EXPRESSWAY 
        </MarqueeText>
      </View>
      <View style={styles.ticketContainer}>
        <View style={styles.ticketUpperBox}>
          <View style={styles.ticketBox}>
          
            <Text style={styles.ticketText2}>SOUTHERN EXPRESSWAY</Text>
            <Text style={styles.ticketText3}>USER FEE TICKET</Text>
          </View>
        </View>
        <View style={styles.ticket}>
          
          <Text style={styles.ticketText}>Date: {currentDate}</Text>
          <Text style={styles.ticketText}>Time: {ticketTime}</Text>
          <Text style={styles.ticketText}>Entrance Gate: {Entrance}</Text>
          <Text style={styles.ticketText}>Exit Gate: {Exit}</Text>
          {selectedVehicle && (
        <View>
          <Text style={styles.ticketText}>Vehicle number: {selectedVehicle.register_no}</Text>
          <Text style={styles.ticketText}>Vehicle number: {selectedVehicle.sv}</Text>
          
        </View>
      )}
      
          <Text style={styles.ticketText}>Amount: RS(LKR) {ticketAmount}.00</Text>
          <Text style={styles.ticketText1}>For Any Inquiry: 1969</Text>
        </View>
      </View>
      <Text style={styles.ticketText4}>Thank You Come Again ! </Text>
      <View style={{marginLeft:15, marginRight:15}}>
        <MarqueeText style={[styles.marquee, { color: marqueeColor }]} duration={100} loop>
          SOUTHERN EXPRESSWAY [{currentDate}] SOUTHERN EXPRESSWAY 
        </MarqueeText>
      </View>
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
  ticketContainer: {
    backgroundColor: '#fff',
    padding: 0,
    alignItems: 'center',
  },
  ticket: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 10,
    height: 350,
    width: 260,
    marginTop: 30,
    borderWidth: 2, 
    borderColor: '#080742',  
    marginBottom: 5, 
  },
  ticketText: {
    fontSize: 16,
    marginTop: 15,
  },
  ticketText1: {
    fontSize: 12,
    marginTop: 30,
    textAlign:'center'
  },
  ticketText2: {
    fontSize: 16,
    marginTop: 10,
    color: '#080742',
    textAlign: 'center',
  },
  ticketText3: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#080742',
    
  },
  ticketText4: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#080742',
    
  },
  marquee: {
    fontSize: 12,
    marginTop:20,
    marginBottom:10,
  },
});
