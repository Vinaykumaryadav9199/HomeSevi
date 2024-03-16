import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useAnimatedValue } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../Utils/Colors';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';


const Login = () => {

    const navigation = useNavigation()
    const [Email,setEmail] = useState("");
    const [Password,setPassword] = useState("");
    const [Message ,setMessage] = useState("")
  
    const handleLogin = async()=>{

        if (Email.length ===0 || Password.length === 0)
        {
            setMessage("Please fill complete Credentials")
            return
        }



        try {
            auth().signInWithEmailAndPassword(Email,Password).then((user)=>{
                    
                navigation.navigate("Home",{Email:user.user.email})
            }).catch((error)=>
            {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    setMessage('The email or password is incorrect.');
                  } else if (error.code === 'auth/invalid-email') {
                    setMessage('Please enter a valid email address.');
                  } else if (error.code === 'auth/too-many-requests') {
                    setMessage('Too many attempts');
                  }
                  else if(error.code === 'auth/invalid-credential'){
                        setMessage("Please Enter Correct Credential")
                  }
                   else {
                    console.error('Login error:', error);
                    setMessage(' Please try again later.');
                  }
            })
                
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>

            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }} >
                <View>
                    <Image source={require('../Assets/Image/Logo.png')} style={styles.LogoImage} resizeMode= "contain" />
                </View>
                <Text style={{fontSize:30 ,fontWeight:"700" ,color:Colors.WHITE , fontFamily:"outfit-Regular"}}>HomeSevi</Text>
                <View>
                    {/* <Image source={require('../Assets/Image/login.png')} style={styles.loginLogo} /> */}
                </View>

            </View>

            <View style={styles.inputContainer}>
                
                <TextInput
                    placeholder='Username'
                    style={[styles.textInput, styles.mt]} onChangeText={(value)=>{
                        setEmail(value)
                    }}
                />
                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    style={styles.textInput} onChangeText={(value)=>{
                        setPassword(value)
                    }}

                />
                <View style={{ width: "80%" }}>
                    <TouchableOpacity style={{ width: "100%" }}>
                        <Text style={{ textAlign: "right", marginTop: 15, fontSize: 16, color: Colors.PRIMARY, fontWeight: '500' }} >Forgot Password ?</Text>
                    </TouchableOpacity>

                </View>
                <View style={{paddingTop:15}}>
                <Text style={{ fontSize:15 , color :"#FF0000"}}> {Message}</Text>
                </View>
                
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: Colors.WHITE, fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Signup") }}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: '500' }}>Don't have an account yet? <Text style={{ fontSize: 18, color: Colors.PRIMARY }}> Signup</Text></Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ backgroundColor: Colors.WHITE, width: '100%', flex: 1, alignItems: 'center', paddingTop: 50 }}>
                <View>
                    <Text style={{ fontSize: 18, textAlign: "center" }}>-----------or continue----------</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', gap: 30, }} >
                    <TouchableOpacity>
                        <Icon name="google-plus-square" size={50} color="#34A853" style={{ marginTop: 15 }} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon name="facebook-square" size={50} color="#316FF6" style={{ marginTop: 15 }} />
                    </TouchableOpacity>

                </View>

            </View>

        </View>

    )
}

export default Login

const styles = StyleSheet.create({

    LogoImage: {
       width:100,
       height:100,
       borderRadius:99

    },
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center'


    },
    loginLogo: {
        height: 80,
        width: 80
    },

    inputContainer: {
        flex: 3,
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }
    ,
    textInput: {
        backgroundColor: "#e6e6e6",
        width: '85%',
        borderColor: '#999999',
        borderWidth: 1,
        fontSize: 15,
        fontWeight: '500',
        color: "black",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 10,

    },
    mt: {
        marginTop: 35,
        marginBottom: 20,

    },

    button:
    {
        width:"85%",
        paddingVertical: 7,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        marginTop: 35
    },


})