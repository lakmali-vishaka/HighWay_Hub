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

    useEffect(() => {

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
    }, []);


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

