import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {
  withHorizontalPadding: boolean
  setSearchQuery: Function
}
//the search bar will set the query to be used when the search is send on the discover and home screen

const SearchBar = ({withHorizontalPadding, setSearchQuery}: Props) => {
  return (
    <View style={[styles.container, withHorizontalPadding && {paddingHorizontal: 20} ]}>
      <View style={styles.searchBar}>
        <Ionicons name='search-outline' size={20} color={Colors.lightGrey}/>
        <TextInput style={styles.searchTxt} 
            placeholder='Search' 
            placeholderTextColor={Colors.lightGrey}
            autoCapitalize='none'
            onChangeText={query => setSearchQuery(query)}
        />
      </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
  },
  searchTxt: {
    fontSize: 14,
    flex: 1,
    color: Colors.darkGrey,
  }
})