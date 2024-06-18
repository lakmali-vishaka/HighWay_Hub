import React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from "react-native";
import {Ionicons} from "react-native-vector-icons";

const ChatBubble = ({ role, text,onSpeech}) => {
    return(
        <View 
        style={[
            styles.chatItem,
            role === "user" ? styles.userChatItem : styles.modelChatItem,

        ]}
        >
            <Text style={styles.chatText}>{text}</Text>
            {role === "model" && (
                <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
                    <Ionicons name="volume-high-outline" size={24} color="#fff"/>
                     </TouchableOpacity>
            )}

            </View>

        
    );
};

const styles = StyleSheet.create({
    chatItem: {
        marginBottom:20,
        padding:10,
        borderRadius:10,
        maxWidth:"70%",
        position:"relative",
    },

    userChatItem:{
        alignSelf: "flex-end",
        backgroundColor: "#080742",
        marginTop:20

    },
    modelChatItem:{
        alignSelf: "flex-start",
        backgroundColor: "#FF6F00",
        opacity:0.8,
        borderColor:'#080742',
        borderWidth:1,
        width:300

    },

    chatText: {
        fontsize:16,
        color:"#fff",
    },
    speakerIcon: {
        position: "absolute",
        bottom:5,
        right:5,

    },

});

export default ChatBubble;