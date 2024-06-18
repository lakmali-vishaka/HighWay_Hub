import React ,{useState} from "react";
import { View,Text,TextInput,TouchableOpacity,FlatList,ActivityIndicator,StyleSheet} from "react-native";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import{speak,isSpeakingAsync,stop}from "expo-speech";




const Chat = ()=> {
  const [chat,setChat] = useState([]);
  const [userInput,setUserInput]=useState("");
  const [loading,setLoading] = useState(null);
  const[error,seterror] = useState(null);
  const[isSpeaking,setSpeaking]=useState(false);

  const API_KEY = "AIzaSyC0CJzxkxGi7QPMp7zYiVn4NIO072o6lbQ";
const handleUserInput = async () => {

  //add use input to chat
  let updateChat = [
    ...chat,
    {

      role:"user",
      parts: [{text:userInput}],

    },
  ];

setLoading(true);

try {

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      contents:updateChat,
    }

  );

  console.log("Gemini Pro API Response:" , response.data);

  const modelResponse = 
  response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  if(modelResponse){

    //Add model response
    const updateChatWithModel = [
      ...updateChat ,
      {
        role: "model",
        parts: [{text:modelResponse}],
      },

    ];

    setChat(updateChatWithModel);
    setUserInput("");

  }

}catch(error){
  console.error("Error calling Gemini Pro API:",error);
  console.error("Error response:",error,response);
  seterror("An error Occur please Try again.");


}finally {
  setLoading(false);
}


};

const handleSpeech = async (text) => {
  if (isSpeaking) {
    // If already speaking, stop the speech
    stop();
    setSpeaking(false); // Corrected to setSpeaking
  } else {
    // If not speaking, start the speech
    if (!(await isSpeakingAsync())) {
      speak(text);
      setSpeaking(true); // Corrected to setSpeaking
    }
  }
};


const renderChatItem = ({item}) => (
  <ChatBubble

  role={item.role}
  text={item.parts[0].text}
  onSpeech={()=> handleSpeech(item.parts[0].text)}
  />

);


return ( 
  <View style={styles.container}>
    <Text style={styles.title}>HWH Chatbot</Text>
    <FlatList
    data={chat}
    renderItem={renderChatItem}
    keyExtractor={(item,index) => index.toString()}
    contentContainerStyle={styles.chatContainer}
    />
    <View style={styles.inputContainer}>

    <TextInput
    style={styles.input}
    plaeholder="Type your message here.."
    placeholderTextColor="#ff00ff"
    value={userInput}
    onChangeText={setUserInput}
    />

    <TouchableOpacity style={styles.button} onPress={handleUserInput}>
      <Text style={styles.buttonText}>send</Text>
    </TouchableOpacity>
    </View>

    {loading && <ActivityIndicator style={styles.loading} color="#333"/>}
    {error && <Text style={styles.error}>{error}</Text>}

</View>


);
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 16,
    backgroundolor: "#f8f8f8",

  },

  title:{
    fontSize: 24,
   fontWeight:"bold",
   // color: "#333",
    marginBottom: 20,
    color: '#080742',
    fontSize: 20,
    marginTop: 50,
    textAlign: "center",

  },
  chatContainer:{
    flexGrow: 1,
    justifyConten:"flex-end",


  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,



  },

  input: {
    flex: 1,
    height: 50,
    marginRight: 10,
    padding: 10,
    borderColor: "#080742",
    borderWidth: 1,
    borderRadius: 25,
    color: "#080742",
    backgroundColor: "#fff",

  },

  button: {

    padding:10,
    backgroundColor:"#080742",
    borderRadius: 25,

  },

  buttonText: {
    color: "#fff",
    textAlign:"center",


  },

  loading:{
    marginTop: 10,
  },

  error: {
    color:"red",
    marginTop: 10,
  },

});

export default Chat;


