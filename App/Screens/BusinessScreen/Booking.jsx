import { StyleSheet, Text, View ,FlatList, TouchableOpacity, TextInput, Modal } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Calendar } from 'react-native-calendars';
import Icon from "react-native-vector-icons/FontAwesome"
import Colors from '../../Utils/Colors';
import { BookingOrder } from './BookingOrder';



const Booking = (props) => {
 const [Message ,setMessage] = useState("")
 const [selectedDate, setSelectedDate] = useState('');
 const [BookingSuccess,setBookingSuccess] = useState(null)
 const [showModal ,setshowModal]  = useState(false)
  const [BookingInfo ,setBookingInfo] =useState({
  Date:"",
  Time:"",
  BookingStatus:"Booked"
 })
 const [time ,settime] = useState([])
const handleDateSelect = async(day) => {
  // Handle the selected date
  setSelectedDate(day.dateString)
  setBookingInfo({...BookingInfo,Date :day.dateString});
  
 
};

const handalBooking  = async(BusinessDetails,BookingInfo)=>{

      if(BookingInfo.Date.length == 0)
      {
          setMessage("Please Select Date")
          return
      }
      else if(BookingInfo.Time.length == 0)

      {
        setMessage("Please Select Time")
        return
      }


  const Booking = BookingOrder(BusinessDetails, BookingInfo)
  .then((success) => {
    setBookingSuccess(true)
  })
  .catch((error) => {
   setBookingSuccess(false)
  });
   console.log(Booking)
  setshowModal(true)
}
const closeSuccessModal = () => {
  setshowModal(false);
  props.setIsBooking(false);
};



const getTime =()=>{
 const timeList = [];
  for (let i =8;i<=11;i++)
  {
     timeList.push({time :i+":00 AM"})
     timeList.push({time :i+":30 AM"})
  }
  timeList.push({time :12+":00 AM"})
  for (let i =1;i<=10;i++)
  {
     timeList.push({time :i+":00 PM"})
     timeList.push({time :i+":30 PM"})
  }
  settime(timeList)
}

  useEffect(() => {
    getTime();

   

  }, [])
  console.log(BookingInfo)


  return (
    <View style={styles.container}>
       <View style={styles.CalendarContainer}>
        <Text style={{fontSize:20,fontFamily:"outfit-Regular",fontWeight:"700" ,padding:3,paddingBottom:10}}>Select Date </Text>
       <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, },
        }}
       style={styles.Calendar} theme={{calendarBackground:"#F5F5F5", selectedDayBackgroundColor:Colors.PRIMARY}}
       minDate={Date.now()}/>
       </View>
       <View>
          <Text style ={{fontSize:20,fontFamily:"outfit-Regular",fontWeight:"700" ,padding:3,paddingBottom:5}}>Select Time </Text>
          {
            time &&(
              <FlatList
                horizontal={true}
                data={time}
                renderItem={({item})=>(
                  <TouchableOpacity onPress={()=>{setBookingInfo({...BookingInfo,Time:item.time})}} style={[ (BookingInfo.Time===item.time)?styles.selected:styles.unselected]}>
                    <Text>{item.time}</Text>
                  </TouchableOpacity>
                )}
              />
            )
          }
       </View>
       <View style ={{display:"flex" ,justifyContent:"center" ,alignItems:"center" ,marginTop :30}}>
        <Text style ={{fontSize:18 ,color :"#FF0000"}}>{Message}</Text>
       </View>
       <View style={styles.btnContainer1}>
          <TouchableOpacity style={styles.btnbook} onPress={()=>{handalBooking(props.BusinessDetails,BookingInfo)}}>
            <Text style={{textAlign:"center",fontFamily:"Outfit-medium",color:Colors.PRIMARY,fontSize:18,}}>Book</Text>
          </TouchableOpacity>
       </View>   
       <Modal visible={showModal}>
         {BookingSuccess !=null ? <View style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%" ,width:"100%"}}>
          {
            BookingSuccess ? <Icon name="check" size={50} color={"#008000"} />:
             <Icon name="remove" size={50}  color={"#FF0000"} />


          }
          <Text style ={{fontSize:25 ,fontFamily :"outfit-Regular" ,fontWeight:"700", marginTop:10, color :Colors.BLACK}}>{BookingSuccess ? "Booking Successfull " : "Something Error"}</Text>
            <TouchableOpacity onPress={closeSuccessModal} style ={{marginTop:20}}>
              <Text style ={{fontSize:18, fontFamily:"outfit-Regular", color:Colors.PRIMARY}}>Close</Text>
            </TouchableOpacity>
          </View>:null}
       </Modal>
    </View>
    
  )
}

export default Booking

const styles = StyleSheet.create({
    container:{
        display:"flex", 
       paddingHorizontal:20
      },
      CalendarContainer:{ 
        
      },
      Calendar:{
        
        borderColor: 'gray',
        height: 360,
        borderRadius:8,
        borderBlockColor:Colors.PRIMARY,
       
      }
      ,timeContainer:{
        height:40,
        width:90, 
        display:'flex',
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        marginRight:10
        
      },
      unselected:{
        height:40,
        width:90, 
        display:'flex',
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        marginRight:10,
        color:Colors.PRIMARY,
       
      },
      selected:{
        height:40,
        width:90, 
        display:'flex',
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        marginRight:10,
        color:Colors.WHITE,
        backgroundColor:Colors.PRIMARY
      }, btnContainer1:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:10,
        marginTop:50
      },btnbook:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:1,
        borderColor:Colors.PRIMARY,
        borderWidth:1,
        height:50,
        borderRadius:99,
        color:Colors.WHITE,
       
      },
     
     
})