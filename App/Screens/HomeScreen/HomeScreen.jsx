import React,{useState} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import HomeHeader from './HomeHeader';
import Heading from './Heading';
import ProvideSlider from './ProvideSlider';
import Categories from './Categories';
import BusinessList from './BusinessList';

const HomeScreen = () => {
  const [ViewCt ,setViewCt] = useState(false)
  const [ViewBL ,setViewBL] = useState(false)
  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView>
        <Heading key="what-we-provide" text="What We Provide" isViewAll={false} />
        <ProvideSlider />
        <Heading key="categories" text="Categories" isViewAll={true} setVal ={setViewCt} />
        <Categories index ={ViewCt} />
        <Heading key="latest-business" text="Latest Business" isViewAll={true} setVal={setViewBL} />
        <BusinessList index={ViewBL} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
