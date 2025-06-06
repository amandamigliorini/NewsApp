import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, Stack } from 'expo-router';
import Loading from '@/components/Loading';
import { NewsItem } from '@/components/NewsList';
import { useIsFocused } from '@react-navigation/native';
import { NewsDataType } from '@/types';

//bookmark page
const Page = () => {
  const [bookmarkNews, setBookmarkNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  // call fetchbookmark everytime isFocused has a change
  useEffect(() => {
    if (isFocused) {
      fetchBookmarks();
    }
  }, [isFocused]);

  //fetchBookmarks function. 
  const fetchBookmarks = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('bookmark');
      const res = token ? JSON.parse(token) : [];

      if (res.length > 0) {
        const queryString = res.join(',');
        //axios function to fetch the news on the api
        const response = await axios.get(
          `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${queryString}`
        );

        if (response?.data?.results) {
          setBookmarkNews(response.data.results);
        } else {
          setBookmarkNews([]);
        }
      } else {
        setBookmarkNews([]);
      }
    } catch (error) {
      console.log("Erro ao buscar favoritos:", error);
      setBookmarkNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {/* showing bookmarks on the screen */}
      <Stack.Screen options={{ headerShown: true }} />
      <View style={styles.container}>
        {/* if there is no bookmark shows a message, if it has bookmarks it shows the bookmark list */}
        {isLoading ? (
          <Loading size={'large'} />
        ) : bookmarkNews.length === 0 ? (
          <Text>There is no bookmark saved.</Text>
        ) : (
          <FlatList
            data={bookmarkNews}
            keyExtractor={(_, index) => `list.item.${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              //link to the bookmark new if touchable opacity make it clickable to follow the link
              <Link
                href={{ pathname: '../news/[id]', params: { id: item.article_id } }}
                asChild
                key={index}
              >
                <TouchableOpacity>
                  <NewsItem item={item} />
                </TouchableOpacity>
              </Link>
            )}
          />
        )}
      </View>
    </>
  );
};

export default Page;

//page style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
