import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { NewsDataType } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import Loading from '@/components/Loading'
import { NewsItem } from '@/components/NewsList'

type Props = {}

//this is the search results component. It uses the query from the search bar 
// and categories and countries checked when the search button is clicked
//the getNews function uses these parameters to set an array of news using the news variable and setNews
const Page = (props: Props) => {
    const {query, category, country} = useLocalSearchParams<{
        query: string, 
        category: string, 
        country: string
    }>();

    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async() => {
        try{
          let categoryString = '';
          let countryString = '';
          let queryString = '';
          if (category){
            categoryString = `&category=${category}`
          }
          if (country){
            countryString = `&country=${country}`
          }
          if (category){
            categoryString = `&q=${query}`
          }
          const URL =`https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&Image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`
          const response = await axios .get(URL);
    
          if(response && response.data){
            setNews(response.data.results);
            setIsLoading(false);
          }
        } catch(err: any){
          console.log('Error message:', err.message)
        }
      };

  return (
<>
{/* displaying the search results on a screen */}
      <Stack.Screen
        options={{
          //button back and title
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='arrow-back' size={22} />
            </TouchableOpacity>
          ),
          title: 'Search',
        }}
      />
    <View style={styles.container}>
        {isLoading ? (
            <Loading size={'large'} />
        ) : (
          //list of news. Each list item is a button with a link to open the news[id] page sending the 
          //news information to be opened
            <FlatList 
                data={news} 
                keyExtractor={(_, index) => `list.items${index}`} 
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) =>{
                    return (
                        <Link href={{ pathname: "../news/[id]", params: { id: item.article_id } }} asChild key={index}>
                        <TouchableOpacity>
                        <NewsItem item={item}/>
                        </TouchableOpacity>
                        </Link>
                    );
                }}          
            />
        )}
    </View>
    </>
  )
}

export default Page
//page style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
})