import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

//landing page
const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <ImageBackground 
        source={require('@/assets/images/getting-started.jpg')} 
        style={{flex: 1, width: '100%'}} 
        resizeMode="cover"
      >
        {/* {animated text and button} */}
        <View style={styles.wrapper}>
          <Animated.Text style={styles.title} entering={FadeInDown.delay(300).duration(600)}>Welcome to News App</Animated.Text>
          <Animated.Text style={styles.description} entering={FadeInDown.delay(800).duration(600)}>Be up to date to what is happening in the world!</Animated.Text>
          <Animated.View entering={FadeInDown.delay(1200).duration(600)}>
            {/* use of expo router to navigate to another screen. Touchable opacity makes the "button" */}
            <TouchableOpacity style={styles.btn} onPress={() => router.replace("/(tabs)")}>
              <Text style={styles.btnText}>Get News</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page;

//page style
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 30,
    gap: 10,
    backgroundColor:'rgba(0, 0, 0, 0.5)'
  },
  title: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: 8,
    textAlign: 'center'
  },
  description: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1.2,
    lineHeight: 22,
    textAlign: 'center'
  },
  btn: {
    backgroundColor: Colors.tint,
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 10
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
