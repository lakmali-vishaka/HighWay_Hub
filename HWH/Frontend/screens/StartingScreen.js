import { View, Text,StyleSheet,Image } from 'react-native'
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native';


export default function StartingScreen() {
    const navigation = useNavigation();

    useEffect(() => {
  const timeout = setTimeout(() => {
    navigation.navigate('Begin');
  }, 4000);

  
        return () => clearTimeout(timeout);
      }, [navigation]); 
    
  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      <Text style={[styles.mainText]}> HighWay Hub </Text>
      <Image source={require('../assets/images/logo.png')} style={styles.logo}/>
      

    </View>
  )
} 



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#080742',
      
      
    },
  
    
  
    mainText: {
      fontSize: 27,
      fontWeight : 'bold', 
      marginTop: -100,
      color:'#fff',
      marginTop:50
      
    },

    logo: {
        width: 200, 
        height: 200,

    },

    

    });

   
   

    
   


