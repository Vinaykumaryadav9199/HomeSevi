import { Image, StyleSheet, Text, View  ,FlatList,ActivityIndicator,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import Icon from "react-native-vector-icons/Ionicons"
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'

const CategoryWiseBusiness = ({route}) => {
    const navigation = useNavigation()
    const [BusinessDetails, setBusinessDetails ] = useState([])
    const [Category ,setCategory] = useState("")
    useEffect(() => {
      const {Category} = route.params
      setCategory(Category)
      let unsubscribe; // Declare the unsubscribe variable outside the try block
  
      const fetchData = async () => {
        try {
          const querySnapshot = await firestore()
            .collection('BusinessDetails') // Replace with your actual collection name
            .where('Category', '==', Category) // Replace with your actual field and value
            .onSnapshot(snapshot => {
              const documents = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
  
              setBusinessDetails(documents);
            });
          
          // Save the unsubscribe function
          unsubscribe = querySnapshot; 
        } catch (error) {
          console.error('Error fetching data from Firebase:', error);
        }
      };
  
      fetchData();
  
      // Cleanup function, will be called when the component unmounts
      return () => {
        if (unsubscribe) {
          unsubscribe(); // Cancel the subscription or clean up resources if needed
        }
      };
    }, []);
  
  return BusinessDetails && (
    <View>
      <View style={{padding:20 , paddingTop :20}}>
            <TouchableOpacity style={{display:"flex" ,flexDirection:"row" ,alignItems:'center',}} onPress={()=>{navigation.goBack()}}>
                <Icon name="chevron-back"  size={30} />
                <Text style={{fontSize:25 , fontFamily:"outfit-medium", fontWeight:"bold"}}> {Category}</Text>
            </TouchableOpacity>
            {
              BusinessDetails.length>0 ? (
                <View>
                    <FlatList
                      data={BusinessDetails}
                      renderItem={({item})=>(
                        <TouchableOpacity onPress={()=>{navigation.push("BusinessDetails" ,{Details:item})}}>
                          <View style={styles.Maincontainer}>
                              <Image source={{uri:item.Image[0]}} style={styles.Image}/>
                              <View>
                                    <Text style={{fontSize:17, fontFamily:"outfit-Regular" ,fontWeight:"700",marginLeft:5}}>{item.Name}</Text>
                                    <Text style={{fontFamily:"outfit-Regular", fontSize:15, marginLeft:5}}>Rating {item.Rating}</Text>
                                    <View style={styles.locationContainer}>
                                       <Icon name="location-outline" color={Colors.PRIMARY} size={15} />
                                       <Text>{item.Address}</Text>
                                    </View>
                                    <Text
                                    style={{fontSize:10 ,fontFamily:"outfit-Regular",paddingHorizontal:10, paddingVertical:3,borderRadius:3, marginTop:3, color:Colors.PRIMARY,backgroundColor:"#E6E6FA", alignSelf:"flex-start"}}>
                                        {item.Category}
                                    </Text>

                              </View>
                        </View>
                        </TouchableOpacity>
                      )}
                    />
                </View>

              ):(<Text style={styles.NoBusiness}>No Business</Text>)
            }
           
      </View>
    </View>
  )
}

export default CategoryWiseBusiness

const styles = StyleSheet.create({
  Maincontainer:{
  display:"flex",
  flexDirection:"row",
  padding:10,
  backgroundColor:Colors.WHITE,
  borderRadius:10,
  gap:12,
  marginTop:13,  
  alignItems:"center"
  },
  Image:{
    height:100,
    width:100,
    borderRadius:10
  },
  locationContainer:{
    display:"flex",
    flexDirection:"row",
    gap:3,
    alignItems:"center"
    
  },
  NoBusiness:{
    fontSize:20,
    margin:10,
    fontFamily:"outfit-Regular",
    fontWeight:"700"
  }
})