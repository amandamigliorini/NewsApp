import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, View } from 'react-native'
import React from 'react'

//this component is to show the loading animation on the page
const Loading = (props: React.JSX.IntrinsicAttributes & 
    React.JSX.IntrinsicClassAttributes<ActivityIndicator> & 
    Readonly<ActivityIndicatorProps>) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator {...props} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})