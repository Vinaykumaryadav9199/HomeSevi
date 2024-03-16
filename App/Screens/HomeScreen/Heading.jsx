import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React , {useState}from 'react'
import Colors from '../../Utils/Colors'

const Heading = (props) => {
    const [ViewAll ,setViewAll] = useState(true)
  return (
    <View style ={styles.mainContainer}>
            <View>
                <Text style ={styles.text}>{props.text}</Text>
            </View>
         { props.isViewAll &&( ViewAll ? ( <TouchableOpacity onPress={()=>{setViewAll(false) ,props.setVal(true)}}>
                <Text style ={styles.ViewAll}>View All</Text>
            </TouchableOpacity>): ( <TouchableOpacity onPress ={()=>{setViewAll(true),props.setVal(false)}}>
                <Text style ={styles.ViewAll}>View Less</Text>
            </TouchableOpacity>))}
    </View>
  )
}

export default Heading

const styles = StyleSheet.create({

    mainContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:15,
        paddingVertical:15,
        alignItems:"center"
    },
    text:{
        fontSize:18,
        fontWeight:"700",
        color:'#5d5d5d',
        fontFamily:"outfit-Regular"
        
    },
    ViewAll:{
        fontSize:16,
        fontWeight:"700",
        color:"#5d5d5d",
        fontFamily:"outfit-Regular"

    }

})