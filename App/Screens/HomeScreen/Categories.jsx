import { StyleSheet, Text, View ,ActivityIndicator,FlatList,Image, TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Categories = (props) => {
    const navigate = useNavigation()
    const [loading, setLoading] = useState(true);
    const [image ,setImage] = useState([])
    useEffect(() => {
      const subscriber = firestore()
       .collection('Categories')
       .onSnapshot(querySnapshot => {
         const categories = [];
   
         querySnapshot.forEach(documentSnapshot => {
           categories.push({
             ...documentSnapshot.data(),
             key: documentSnapshot.id,
           });
         });
         
        
         setImage(categories);
         setLoading(false);
       });
   
     // Unsubscribe from events when no longer in use
     return () => subscriber();
   }, []);
 
     
   if (loading) {
     return <ActivityIndicator />;
   }

  return image&&(
    <View>
      <FlatList
        data={props.index ?image:image.slice(0,4)}
        numColumns={4}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>{navigate.push("Business",{Category:item.Name})}}>
              <View style={styles.ImageContainer}>
               <Image source={{uri:item.Image}} style={styles.image} resizeMode='stretch'/>
                <Text style={styles.categoriesText}>{item.Name}</Text>
              </View>   
        </TouchableOpacity>
        
         
      )}
    />

   
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    
    ImageContainer:{
            display:"flex",
            paddingHorizontal:15,  
            gap:4,
           marginTop:10
           
    },

    image:{
        height:48,
        width:48
    },
    categoriesText:{
        fontFamily:"outfit-Regular",
        fontSize:14
       
    }
})