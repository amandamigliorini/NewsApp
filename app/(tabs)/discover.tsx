import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import CheckBox from '@/components/CheckBox'
import { useNewsCategories } from '@/hooks/useNewsCategories'
import { useNewsCountry } from '@/hooks/useNewsCountry'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Link } from 'expo-router'

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();

  const {newsCategories, toggleNewsCategory} = useNewsCategories();
  const {newsCountries, toggleNewsCountry} = useNewsCountry();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  return (
    // the view add a SearchBar component. The checkbox component is used to show categories and countries options
    <View style={[styles.container, {paddingTop:safeTop + 20}]}>
      <SearchBar withHorizontalPadding={false} setSearchQuery={setSearchQuery}/>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>
        {newsCategories.map((item) => (
          <CheckBox 
            key={item.id} 
            label={item.title} 
            checked={item.selected} 
            onPress={() => {
              toggleNewsCategory(item.id);
              setCategory(item.slug);
            }} 
          />
        ))}
      </View>

      <Text style={styles.title}>Countries</Text>
      <View style={styles.listContainer}>
        {newsCountries.map((item, index) => (
          <CheckBox 
            key={index} 
            label={item.name} 
            checked={item.selected} 
            onPress={() => {
              toggleNewsCountry(index);
              setCountry(item.code)
            }} 
          />
        ))}
      </View>
        {/* when the search button is clicked it will pass the query of the input and what country and category is checked */}
      <Link href={{ pathname: "../news/search", params: { query: searchQuery, category, country } }} asChild>
      <TouchableOpacity style={styles.searchBtn}>
        <Text style={styles.searchBtnTxt}>Search</Text>
      </TouchableOpacity>
      </Link>
    </View>
  )
}

export default Page

//page style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
    marginBottom: 20
  },
  searchBtn: {
    backgroundColor: Colors.tint,
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginVertical: 10
  },
  searchBtnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600'
  }
})