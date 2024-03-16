import { Image, StyleSheet, Text, View  ,FlatList,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';


const ProvideSlider = () => {
  const [loading, setLoading] = useState(true);
   const [image ,setImage] = useState([])
   useEffect(() => {
    const subscriber = firestore()
      .collection('provided')
      .onSnapshot(querySnapshot => {
        const provided = [];
  
        querySnapshot.forEach(documentSnapshot => {
          provided.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        
        provided.reverse()
        setImage(provided);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

    
  if (loading) {
    return <ActivityIndicator />;
  }
  
  return image && (
    <View>
       <FlatList
       horizontal={true}
      data={image}
      renderItem={({ item }) => (
         <View style={styles.ImageContainer}>
             <Image source={{uri:item.Image}} style={styles.image} resizeMode='stretch'/>
          </View>
      )}
    />
    </View>
  )
}

export default ProvideSlider

const styles = StyleSheet.create({

  image:{
    height:110,
    width:200,
    borderRadius:10
  }
  ,
ImageContainer:{
    display:"flex",
    paddingLeft:13,
    borderRadius:10,
    height:110,
    width:200,
    marginLeft:6,
    marginRight:6,

  }
})