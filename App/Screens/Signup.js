import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState,useEffect } from 'react'
import Colors from '../Utils/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import onGoogleButtonPress from "./GoogleSignupLogin/GoogleAuthFunctions"
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';


const Signup = () => {
  GoogleSignin.configure({
    webClientId: '439938353015-3ele63ehd95smq565fblvf4u2vn986ir.apps.googleusercontent.com', // From Google Cloud Console
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);
    return subscriber; // unsubscribe on unmount
  }, []);


  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the Google credential
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error(error);
    }
  };

  const navigation = useNavigation();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Cnfpassword ,setCnfpassword] = useState("")
  const [message ,setMessage] =useState("")
  const handelsignup = async () => {
    console.log(Name);
    console.log(Email);
    console.log(Password);
    if(Name.length ==0 || Email.length == 0 || Password.length == 0 || Cnfpassword.length == 0){

        setMessage("please fill complete Credentials")
        return
    }
    else if (Password != Cnfpassword)
    {
      setMessage("Password Does Not match with Cnf Password");
      return
    }

    try {
      // Create a new user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(Email, Password);

      // Access the newly created user
      const newUser = userCredential.user;

      // Update the user's display name with the provided name
      await newUser.updateProfile({
        displayName: Name,
      });

      // You can also save the user's name to your database if needed
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setMessage('Email already in use');
      } else if (error.code === 'auth/invalid-email') {
        setMessage('Please enter a valid email address.');
      } else if (error.code === 'auth/operation-not-allowed') {
        setMessage('Operation not allowed');
      } else if (error.code === 'auth/weak-password') {
        setMessage('Please choose a stronger password.');
      }
      else {
        console.error('Signup error:', error);
        setMessage(' Please try again later.');
      }
    }

  }


  const handealgooglesignup =()=>{
   onGoogleButtonPress()
   
  }

  return (

    <View style={{ flex: 1 }}>

      <View style={{ flex: 3, backgroundColor: Colors.PRIMARY, justifyContent: "center", alignItems: 'center' }}>
        <Image source={require('../Assets/Image/Logo.png')} style={styles.logoImage} />
        <Text style={{fontSize:30 ,fontWeight:"700" ,color:Colors.WHITE , fontFamily:"outfit-Regular"}}>HomeSevi</Text>

      </View>
      <View style={{
        flex: 5, gap: 20, marginTop: -30, borderTopLeftRadius: 30,
        borderTopRightRadius: 30, backgroundColor: Colors.WHITE
      }}>

        <View style={{ marginTop: 40, flex: 2, justifyContent: "center", alignItems: "center" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Icon name="user-o" size={25} style={{ zIndex: 2, marginLeft: 30, marginTop: 10 }} />
            <TextInput
              placeholder='Name' style={styles.TextInput}
              onChangeText={(value) => setName(value)}>
            </TextInput>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Icon name="envelope" size={25} style={{ zIndex: 2, marginLeft: 30, marginTop: 10 }} />
            <TextInput
              placeholder='Email' style={styles.TextInput}
              onChangeText={(value) => setEmail(value)}>
            </TextInput>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Icon name="lock" size={30} style={{ zIndex: 2, marginLeft: 30, marginTop: 10 }} />
            <TextInput
              placeholder='Password' style={styles.TextInput}
              onChangeText={(value) => setPassword(value)}  secureTextEntry={true}>
            </TextInput>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Icon name="lock" size={30} style={{ zIndex: 2, marginLeft: 30, marginTop: 10 }} />
            <TextInput
              placeholder='Confirm Password' style={styles.TextInput}
              onChangeText={(value) => setCnfpassword(value)} secureTextEntry={true}>
                
            </TextInput>
          </View>
            <Text style={{ fontSize:15 , color :"#FF0000"}}>{message}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={handelsignup}>
            <Text style={{ textAlign: 'center', fontSize: 18, color: Colors.WHITE, fontWeight: 'bold' }}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
            <Text style={{ marginTop: 25, marginBottom: 5, fontSize: 16, color: 'black', fontWeight: '500' }}> Already have an account?<Text style={{ color: Colors.PRIMARY }}> Signin</Text></Text>
          </TouchableOpacity>

        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>

        <Text style={{ fontSize: 18, textAlign: "center" }}>-----------or continue----------</Text>

        <View style={{ flex: 1, justifyContent: 'center', flexDirection: "row", gap: 20 }}>
          <TouchableOpacity onPress={()=>{handleGoogleSignIn()}}>
            <Icon name="google-plus-square" size={50} color="#34A853" style={{}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="facebook-square" size={50} color="#316FF6" style={{}} />
          </TouchableOpacity>
        </View>
      </View>


    </View>
  )
}

export default Signup

const styles = StyleSheet.create({

  TextInput: {
    backgroundColor: "#e6e6e6",
    width: '85%',
    height: 45,
    borderColor: '#999999',
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '500',
    color: "black",
    paddingVertical: 12,
    paddingLeft: 40,
    borderRadius: 10,
    marginLeft: -32

  },
  logoImage: {
    width:100,
    height:100,
    borderRadius:99

  },
  button:
  {
    width: "85%",
    paddingVertical: 7,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,

  },
  loginLogo: {
    height: 80,
    width: 80
  },
})