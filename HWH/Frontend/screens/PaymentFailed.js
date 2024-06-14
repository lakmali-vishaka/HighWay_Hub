import { View, Text,StyleSheet,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native';


export default function PaymentFailed() {
  const navigation=useNavigation();
  return (
      <View className="bg-white h-full w-full" style={{marginTop:25}}>
        <StatusBar style='dark'/>
        <View className="bg-blue-950 w-full p-4 absolute flex-row justify-between" style={{backgroundColor:'#080742'}}>
          <Icon name="arrow-left" size={18} color="#ffff" className="pt-1.5" onPress={()=> navigation.push('Home')}/>
          <Text className="text-center font-bold text-xl" style={{color:'#FF6F00'}}>   HighWay Hub</Text>
          <TouchableOpacity style={{padding:5}} onPress={()=> navigation.push('user')}>
            <Image source={require('../assets/images/profile.jpg')} className="w-6 h-6 rounded-3xl"/>
          </TouchableOpacity>
        </View>

        <View className="bg-orange-400 w-full p-1 mt-20 flex-row justify-center" style={{backgroundColor:'#FF6F00'}}>
          <Text className="text-blue-950 text-center font-bold text-lg" style={{color:'#080742'}}>Payment Status</Text>
        </View>
        
        <View style={styles.circleContainer}>
          <View style={styles.circle} />
            <View style={styles.TickContainer}>
              <Text style={styles.tickMark}>X</Text>
            </View>
          </View>

          <View style={styles.container}>
            <Text style={[styles.thirdText]}>Payment Incomplete</Text>
          </View>

          <View style={{alignItems:'center',flex:0.5}}>
            <TouchableOpacity style={{padding:20}} onPress={()=> navigation.push('PaymentAmount')}>
              <View style={{backgroundColor: '#080742',borderRadius:60,alignItems:'center',height:40,width:300}}>
                  <Text style={{color:'white',fontSize:18,marginTop:5,fontWeight:'bold'}}>Try Again</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    mainText: {
     color: '#FF6F00',
     fontSize: 18,
     fontWeight: 'bold',
    },

    circleContainer: {
      alignItems: 'center',
      marginTop: 200,
    },
  
    circle: {
      marginTop: -150,
      width: 250,
      height: 250,
      borderRadius: 125, 
      backgroundColor: '#E0E0E0',
      borderWidth: 2, 
      borderColor:'#D10000',
    },

    tickMark: {
      fontSize: 80,
      color: '#D10000',
    },

    TickContainer: {
      marginTop: -180,
    },

    thirdText: {
      marginBottom: 10,
      fontSize: 20,
      color: '#D10000',
      fontWeight: 500
    },

    button: {
      borderRadius:35,
      width: 260,
      height:40,
      backgroundColor: '#080742',
      marginBottom:70,
      marginLeft:60,
     alignItems: 'center',
     justifyContent: 'center', 
    },

    buttonText: {
      color:'white',
      textAlign:'center',
      fontSize:17,
      justifyContent: 'center', 
    },

    buttonContainer: {
      flexDirection: 'row',
    }
    

});