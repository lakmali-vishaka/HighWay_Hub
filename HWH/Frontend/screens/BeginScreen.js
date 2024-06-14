import { View, Text,TouchableOpacity,StyleSheet,Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native';

export default function BeginScreen() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      <Text style={[styles.first]}>SCAN,PAY,GO</Text>
      <Text style={[styles.second]}>THE FUTURE OF TOLL PAYMENTS IS HERE</Text>
      <Text style={[styles.third]}>Get Started</Text>
      <Image source={require('../assets/images/logo.png')} style={styles.logo}/>

      

      
      

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.push('Login')}>
          <Text style={styles.buttonText}>User</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=> navigation.push('OPLogin')}>
          <Text style={styles.buttonText}>Operator</Text>
        </TouchableOpacity>

        
      </View>

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
  
    first: {
        fontSize: 15,
        fontWeight : 'bold', 
        color:'white',
        textAlign: 'center',
        bottom: 85,
        
      },

    second: {
        fontSize: 15,
        fontWeight : 'bold', 
        color:'white',
        textAlign: 'center',
        bottom: 80,
      },
  


    third: {
      fontSize: 25,
      fontWeight : 'bold', 
      color:'#FF6F00',
      textAlign: 'center',
      bottom: -260,
    },

    
      buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        bottom: -100,
        textAlign: 'center',
       alignItems:'center',

      },
       
      
    
      button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 35,
        marginHorizontal: 8, // Adjust the spacing between buttons if needed
        alignItems: 'center',
        width: 150, // Set the width of the buttons
        height: 40, // Set the height of the buttons
       
      },
    
      buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },

      logo: {
        width: 200, 
        height: 200,

    },


      

    });


    

