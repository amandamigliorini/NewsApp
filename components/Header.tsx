import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}
//header component of the home screen
//it renders a random user image and a welcome message
const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{uri: 'https://xsgames.co/randomusers/avatar.php?g=female'}} style={styles.userImg}/>
        <View style={{gap:3}}>
          <Text style={styles.wlcmText}>Welcome,</Text>
          <Text style={styles.userName}>Jane Doe</Text>
        </View>
      </View>
      {/* this button does notting, it is a preparation for future implementations */}
      <TouchableOpacity onPress={() => {}}>
      <Ionicons name='notifications-outline' size={24} color={Colors.black} />
      </TouchableOpacity>
    </View>
  )
}

export default Header
// page styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wlcmText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black
  }
})