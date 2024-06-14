import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Animated,{ FadeIn, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function PaymentScreen2() {
    const navigation = useNavigation();
  return (
    <View style={{height:'100%', width:'100%', backgroundColor:'white', marginTop:25}}>
      
        <StatusBar style='dark'/>
        <View className="bg-blue-950 w-full p-4 absolute flex-row justify-between" style={{backgroundColor:'#080742'}}>
          <Icon name="arrow-left" size={18} color="#ffff" className="pt-1.5" onPress={()=> navigation.push('Payment1')}/>
          <Text className="text-center font-bold text-xl" style={{color:'#FF6F00'}}>   HighWay Hub</Text>
          <TouchableOpacity style={{padding:5}} onPress={()=> navigation.push('user')}>
            <Image source={require('../assets/images/profile.jpg')} className="w-6 h-6 rounded-3xl"/>
          </TouchableOpacity>
        </View>

        <View className="bg-orange-400 w-full p-1 mt-20 flex-row justify-center" style={{backgroundColor:'#FF6F00'}}>
          <Text className="text-blue-950 text-center font-bold text-lg" style={{color:'#080742'}}>Payment Methods</Text>
        </View>

        <Animated.Text style={{left:'5%',marginTop:30,color:'#022043'}} entering={FadeInDown.duration(1000).springify()}>Enter Card Details...</Animated.Text>
      <ScrollView>
        <Animated.View style={{width:'90%', height:75,backgroundColor:'#D9D9D9',left:'5%',marginTop:20,borderRadius:15}} entering={FadeInDown.delay(200).springify()}>
            <TextInput style={{color:'#747070',margin:25,borderWidth: 0, borderColor:'#D9D9D9',color:'#080742'}} placeholder='Card Number' placeholderTextColor={'gray'}/>
        </Animated.View>

        <Animated.View style={{width:'90%', height:75,backgroundColor:'#D9D9D9',left:'5%',marginTop:20,borderRadius:15}} entering={FadeInDown.delay(400).springify()}>
            <TextInput style={{color:'#747070',fontSize:15,margin:25,borderWidth: 0, borderColor:'#D9D9D9',color:'#080742'}} placeholder='Expire Date (MM/YY)' placeholderTextColor={'gray'}/>
        </Animated.View>

        <Animated.View style={{width:'90%', height:75,backgroundColor:'#D9D9D9',left:'5%',marginTop:20,borderRadius:15}} entering={FadeInDown.delay(600).springify()}>
            <TextInput style={{color:'#747070',fontSize:15,margin:25,borderWidth: 0, borderColor:'#D9D9D9',color:'#080742'}} placeholder='CVC' placeholderTextColor={'gray'}/>
        </Animated.View>

        <Animated.View style={{alignItems:'center', marginBottom:20}} entering={FadeInDown.delay(800).duration(1000).springify()}>
          <TouchableOpacity style={{padding:20}} onPress={()=> navigation.push('Payment1')}>
            <View style={{backgroundColor: '#080742',marginTop:50,borderRadius:60,alignItems:'center',height:40,width:300}}>
                <Text style={{color:'white',fontSize:18,marginTop:5,fontWeight:'bold'}}>Save</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
        
            
        </View>
    
  )
}