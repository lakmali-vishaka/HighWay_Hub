import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated,{ FadeIn, FadeInUp, FadeInDown } from 'react-native-reanimated';
import axios from 'axios';
import CONFIG from '../config';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);

  const navigation = useNavigation();
  const URL = CONFIG.CONNECTION_URL;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${URL}/user/userdata`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    loadImage();
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Constants.platform.ios) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const loadImage = async () => {
    try {
      const imageUri = await AsyncStorage.getItem('profileImage');
      if (imageUri) {
        setProfileImage(imageUri);
      }
    } catch (error) {
      console.error('Failed to load image from storage', error);
    }
  };


  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Image Picker Result:', result);

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        if (uri) {
          setProfileImage(uri);
          await AsyncStorage.setItem('profileImage', uri);
        } else {
          console.error('Image URI is undefined');
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <View style={styles.container}>
        <View style={{paddingLeft:40,paddingRight:40,paddingBottom:40, backgroundColor:'#080742', marginTop:25, paddingTop:20}}>
            <TouchableOpacity style={styles.Edit0} onPress={()=> navigation.push('Home')}>
                <Icon name="arrow-left" size={18} color="#ffff" className="pt-1.5" onPress={()=> navigation.push('Home')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={pickImage}>
                <View style={styles.imageContainer}>
                {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                    //<Text style={styles.placeholder}>+</Text>
                    <Text style={styles.plusIcon}>+</Text>
                )}
                </View>
            </TouchableOpacity>

            {userData && ( // Conditionally render based on userData
                <>
                    <Text style={styles.EditC}>{userData.NIC}</Text>
                    {/*<Text style={styles.EditC}><Text>password:{userData.password}</Text></Text>*/}
                    <Text style={styles.EditC}>{userData.email}</Text>
                    <Text style={styles.EditC}><Text>{userData.Mobile}</Text></Text>

                </>
            )}
        </View>
        <TouchableOpacity style={styles.Edit}> 
        <Icon name="book" size={18} color="#FF6F00" style={styles.text3}/>
        <Text  style={styles.text4}> Payment details</Text>
      </TouchableOpacity>
              
      <TouchableOpacity style={styles.Edit} onPress={()=> navigation.push('T1')}> 
        <Icon name="car" size={18} color="#FF6F00" style={styles.text3}/>
        <Text  style={styles.text4}>Registered Vehicles</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Edit} onPress={()=> navigation.push('Edit')}> 
        <Icon name="pencil" size={18} color="#FF6F00"  style={styles.text3}/>
        <Text  style={styles.text4}> Edit profile</Text>
      </TouchableOpacity>

      <Animated.View style={{alignItems:'center', marginTop:130}} entering={FadeInDown.delay(800).duration(1000).springify()}>
        <TouchableOpacity style={{padding:20}} onPress={()=> navigation.push('Begin')}>
          <View style={{backgroundColor: '#080742',marginTop:50,borderRadius:60,alignItems:'center',height:40,width:300}}>
              <Text style={{color:'white',fontSize:18,marginTop:5,fontWeight:'bold'}}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginLeft:'29%',
    marginBottom:20,
    borderWidth: 2,
    borderColor: '#ff6f00'
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },

  placeholder: {
    fontSize: 24,
    color: '#888',
    position: 'absolute',
    top: '40%',
    left: '40%',
  },

  plusIcon: {
    position: 'absolute',
    bottom: -8,
    right: 0,
    fontSize: 45,
    color: '#ff6f00',
  },

  text3:{
    marginLeft:25,
    marginTop:35,
    fontSize:18
  },

  text4:{
    marginLeft:45,
    marginTop:30,
    fontSize:18
  },

  Edit0:{
    flexDirection:'row',
    justifyContent:'flex-start',
    marginLeft:-15
  },

  Edit:{
    flexDirection:'row',
    justifyContent:'flex-start',
    marginLeft:10
  },

  Edit2:{
    flexDirection:'row',
    justifyContent:'space-between',
  },

  Edit1:{
    borderWidth:1,
    borderColor:'#ffffff',
    padding:3,
    borderRadius:10,
    marginBottom:20
  },

  EditC:{
    color:'white',
    textAlign:'center'
  },

  EditD:{
    color:'white',
    textAlign:'center'
  },

  Edit2:{
    flexDirection:'row',
    justifyContent:'space-between'
  },

  logout:{
    justifyContent:'space-between',
  },

  marginl:{
    padding:15,
    marginTop:180,
    borderRadius:99,
    backgroundColor:'#080742',
    textAlign:'center',
    color:'White'
  },

  image1:{
    width:100,
    height:100,
    margin:20,
  },

  image2:{
    width:10,
    height:10,
    paddingTop:20,
    paddingRight:25
  },

  image3:{
    width:50,
    height:50,
    paddingBottom:5,
    marginTop:20,
  },

  image4:{
    width:35,
    height:35,
    paddingBottom:5,
    marginTop:20,
  }
});

export default ProfileScreen;
