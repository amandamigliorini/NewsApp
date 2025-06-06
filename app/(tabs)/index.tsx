import { ActivityIndicator, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import Categories from '@/components/Categories'
import NewsList from '@/components/NewsList'
import Loading from '@/components/Loading'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}
//code for the home screen
const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // when the page opens it calls the functions to make the breaking news and trending section
  useEffect(() => {
    getBreakingNews();
    getNews();  
  }, []);

  //breaking news fetch data from the API using axios
  //if the news are fetched it  will be stored in breaking news variable to be shown using breakingNews component
  const getBreakingNews = async() => {
    try{
      const URL =`https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&Image=1&removeduplicate=1&size=5`
      const response = await axios .get(URL);

      if(response && response.data){
        setBreakingNews(response.data.results);
        setIsLoading(false);
      }
    } catch(err: any){
      console.log('Error message:', err.message)
    }
  };
//breaking news fetch data from the API using axios
//if the news are fetched it will be stored in the news variable to be shown using News List component
  const getNews = async(category:string = '') => {
    try{
      let categoryString = '';
      if (category.length !== 0){
        categoryString = `&category=${category}`
      }
      const URL =`https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&Image=1&removeduplicate=1&size=10${categoryString}`
      const response = await axios .get(URL);

      if(response && response.data){
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch(err: any){
      console.log('Error message:', err.message)
    }
  };

  //this function changes the category to be fetched on the getNews function using categories component
  const onCatChanged = (category: string) => {
    console.log("Category: ", category);
    setNews([]);
    getNews(category);
  }

  return (
    <ScrollView style={[styles.container, {paddingTop: safeTop}]}>
      <Header />
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          {/* same as SearchBar from discover screen. */}
        <SearchBar withHorizontalPadding={true} setSearchQuery={setSearchQuery} />
        </View>
        <Link href={{ pathname: "../news/search", params: { query: searchQuery} }} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name='search' size={22} color={Colors.white}/>
            </TouchableOpacity>
          </Link>
      </View>
      {/* showing breaking news, categories button and filter, and trending news (NewList) */}
      {isLoading ? (
        <Loading size={"large"} />
      ): (
      <BreakingNews newsList={breakingNews}/>
      )}
      <Categories onCategoryChanged={onCatChanged}/>
      <NewsList newsList={news}/>
    </ScrollView>
  )
}

export default Page

//page style
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBtn: {
    backgroundColor: Colors.tint,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchInput: {
    width: '95%',
  }
})