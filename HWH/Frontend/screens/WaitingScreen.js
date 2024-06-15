import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TouchableOpacity, Button,StyleSheet,center } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function WaitingScreen() {
    const navigation = useNavigation();
    const [paymentStatus, setPaymentStatus] = useState('');
    const [error, setError] = useState(null);




    {/*useEffect(() => {

        // Retrieve payment status from AsyncStorage
        const getPaymentStatus = async () => {
            try {
                const status = await AsyncStorage.getItem('paymentStatus');
                if (status !== null) {
                    setPaymentStatus(status);
                }
            } catch (error) {
                console.error(error);
                setError('Error retrieving payment status');
            }
        };

        getPaymentStatus();
    }, []);*/}


    return (
        <View style={{height:'100%', width:'100%', backgroundColor:'white', marginTop:25}}>
            <StatusBar style='dark'/>
            {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
            <View className="bg-blue-950 w-full p-4 absolute flex-row justify-between" style={{backgroundColor:'#080742'}}>
                <Icon name="arrow-left" size={18} color="#ffff" className="pt-1.5" onPress={()=> navigation.push('OpExit')}/>
                <Text className="text-center font-bold text-xl" style={{color:'#FF6F00'}}>   HighWay Hub</Text>
                <TouchableOpacity style={{padding:5}} onPress={()=> navigation.push('operator')}>
                    <Image source={require('../assets/images/profile.jpg')} className="w-6 h-6 rounded-3xl"/>
                </TouchableOpacity>
            </View>

            <View className="bg-orange-400 w-full p-1 mt-20 flex-row justify-center" style={{backgroundColor:'#FF6F00'}}>
                <Text className="text-blue-950 text-center font-bold text-lg" style={{color:'#080742'}}></Text>
            </View>

            <View style={{backgroundColor:"#E0E0E0", height:210, marginTop:130, width:"60%", marginLeft:"20%", borderRadius:120, borderWidth:1}}>
                <Icon name="check" size={140} color="#080742" style={{marginTop:35, marginLeft:"18%"}} onPress={()=> navigation.push('Home')}/>
            </View>

            <View>
                <Text  style={{color:'#080742',fontSize:18, fontWeight:"bold", textAlign:"center",marginTop:50}}>{paymentStatus}</Text>
            </View>

            <View style={{width:'70%' , left:'15%', color:"#fff", marginTop:50}}>
                <Button title="TEST 123" onPress={()=> navigation.push('test')} color="#E0E0E0"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0
    },
    profileImage: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    dotIndicatorContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 5,
      marginBottom:10
    },
    bottomRectangle: {
      backgroundColor: '#080742',
      height: 120,
      width: '100%',
      position: 'absolute',
      bottom: 0,
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
      borderRadius: 10,
      alignSelf: 'center',
      marginVertical: 'auto',
      bottom: 0,
    },
    buttonContainer: {
      marginBottom: 130,
      width: '95%',
      flexDirection: 'column',
    },
    button: {
      backgroundColor: '#E0E0E0',
      padding: 0,
      marginBottom: 5,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#D9D9D9'
    },
    buttonText: {
      color: '#080742',
      fontSize: 18,
      fontWeight: 'bold'
    },
    buttonIcon: {
      right: 0,
      marginRight: 10,
      height: 50,
      width: 50
    },
    buttonContent: {
      flexDirection: 'row',
      right: -30,
      top: 10
    },
    iconContainer: {
      position: 'absolute',
      bottom: -35,
      left: 253,
      backgroundColor: 'transparent',
      padding: 10,
      borderRadius: 5,
    },
    content: {
      justifyContent:'center',
      alignItems: 'center',
      borderRadius:20, 
      marginBottom:10,
      width:340,
      height:80,
      borderColor: '#FF6F00',
      borderWidth: 3,
    },
    messageText: {
      fontSize: 18,
      color: '#080742',
      textAlign:'center',
    },
  });
