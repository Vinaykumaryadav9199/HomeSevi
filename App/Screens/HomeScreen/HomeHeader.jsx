import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../Utils/Colors';
import Icon from "react-native-vector-icons/FontAwesome";
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const HomeHeader = () => {
  const navigation = useNavigation();
  const [User, setUser] = useState('');

  useEffect(() => {
    const user = auth().currentUser;
    setUser(user);
    console.log(User);
  }, [User]);

  const handleProfilePress = () => {
    // Navigate to the user's profile screen
    navigation.navigate('Profile');
  };

  return User && (
    <View style={styles.Maincontainer}>
      <View style={styles.Container}>
        <TouchableOpacity onPress={handleProfilePress}>
          <View style={styles.ProfileContainer}>
            <View style={styles.profilePic}>
              <Text style={{ fontSize: 30, fontWeight: "bold", color: Colors.WHITE }}>{User?.displayName?.charAt(0)}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 15, color: Colors.WHITE }}>Welcome,</Text>
              <Text style={{ fontSize: 18, fontWeight: "800", color: Colors.WHITE }}>{User.displayName}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("BookingNavigation")}}>
          <Icon name="bookmark-o" size={23} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Search'
          style={styles.SearchInput}
        />
        <View style={styles.SearchIcon}>
          <Icon name="search" size={25} />
        </View>
      </View>
    </View>
  );
}

export default HomeHeader;

const styles = StyleSheet.create({
  Maincontainer: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  Container: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  },
  ProfileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profilePic: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 48,
    backgroundColor: "#043927",
    borderRadius: 99
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    gap: 8,
    paddingTop: 10
  },
  SearchInput: {
    backgroundColor: Colors.WHITE,
    width: "85%",
    height: 38,
    fontSize: 15,
    borderRadius: 8,
    paddingLeft: 12
  },
  SearchIcon: {
    height: 38,
    width: 38,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  }
});
