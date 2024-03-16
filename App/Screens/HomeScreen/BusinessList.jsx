import { StyleSheet, Text, View ,ActivityIndicator,FlatList,Image, TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import firestore from '@react-native-firebase/firestore';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native'

const BusinessList = ( props) => {
  const navigation = useNavigation()
    const [loading, setLoading] = useState(true);
    const [BusinessDetails ,setBusinessDetails] = useState([])
    useEffect(() => {
     const subscriber = firestore()
       .collection('BusinessDetails')
       .onSnapshot(querySnapshot => {
         const BusinessDetails = [];
   
         querySnapshot.forEach(documentSnapshot => {
            BusinessDetails.push({
             ...documentSnapshot.data(),
             key: documentSnapshot.id,
           });
         });
         
        
         setBusinessDetails(BusinessDetails);
         setLoading(false);
       });
   
     // Unsubscribe from events when no longer in use
     return () => subscriber();
   }, []);
 
     
   if (loading) {
     return <ActivityIndicator />;
   }


  return BusinessDetails && (
    <View>
        
        <FlatList
         numColumns={2}
        data={props.index ? BusinessDetails:BusinessDetails.slice(0,2)}
        renderItem={({ item }) => (
        <TouchableOpacity  onPress={()=>{navigation.push("BusinessDetails" ,{Details:item})}}>
                <View >
                <View style={styles.Container}>
                   <Image source={{uri:item.Image[0]}} style={styles.image} resizeMode='stretch'/>
                   <Text style={{fontSize:17, fontFamily:"outfit-medium"}}>{item.Name}</Text>
                   <Text style={{fontSize:13, fontFamily:"outfit-Regular"}}>Rating {item.Rating}</Text>
                   <Text style={{fontSize:10 ,fontFamily:"outfit-Regular",paddingHorizontal:10, paddingVertical:3,borderRadius:3, marginTop:3, color:Colors.PRIMARY,backgroundColor:"#E6E6FA", alignSelf:"flex-start"}}>{item.Category}</Text>
              </View> 
                </View>
        </TouchableOpacity>  
      )}
    />
    </View>
  )
}

export default BusinessList

const styles = StyleSheet.create({

    Container:{
        display:"flex",
        padding:10,
        backgroundColor:Colors.WHITE,
        borderRadius:15,
        marginBottom:15,
        marginLeft:10
        
    },
    image:{
        height:100,
        width:150,
        borderRadius:15
    }


})