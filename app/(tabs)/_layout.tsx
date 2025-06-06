import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '@/components/TabBar'

//layout for tabs (screens) using tabBar component
const TabLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} 
    screenOptions={{headerShown: false}}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
        }}
      />
      <Tabs.Screen
      name="bookmarks"
      options={{
        title: "Bookmarks",
      }}
      />
    </Tabs>
  )
}

export default TabLayout