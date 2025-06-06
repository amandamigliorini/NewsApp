import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { NewsDataType } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Loading from '@/components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import * as WebBrowser from 'expo-web-browser';

const NewsDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [news, setNews] = useState<NewsDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmark] = useState(false);

  //when the page opens it will call the function to have the news stored of the variable
  useEffect(() => {
    fetchNews();
  }, []);

  //call the function to see if the new is bookmarked
  useEffect(() => {
    if (news?.article_id) {
      checkIfBookmarked(news.article_id);
    }
  }, [news]);

  //fetch the new to be opened
  const fetchNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get(URL);

      if (response?.data?.results?.length > 0) {
        setNews(response.data.results[0]);
      } else {
        console.log('No news found.');
      }
    } catch (error: any) {
      console.log('Error fetching news:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfBookmarked = async (newsId: string) => {
    const stored = await AsyncStorage.getItem('bookmark');
    const bookmarks: string[] = stored ? JSON.parse(stored) : [];
    setBookmark(bookmarks.includes(newsId));
  };

  //set the new as bookmarked using asyncstorage
  const saveBookmark = async (newsId: string) => {
    const stored = await AsyncStorage.getItem('bookmark');
    const bookmarks: string[] = stored ? JSON.parse(stored) : [];

    if (!bookmarks.includes(newsId)) {
      const updated = [...bookmarks, newsId];
      await AsyncStorage.setItem('bookmark', JSON.stringify(updated));
      setBookmark(true);
      alert("News saved.");
    }
  };

  //remove the news from the bookmarked list
  const removeBookmark = async (newsId: string) => {
    const stored = await AsyncStorage.getItem('bookmark');
    const bookmarks: string[] = stored ? JSON.parse(stored) : [];

    const updated = bookmarks.filter(id => id !== newsId);
    await AsyncStorage.setItem('bookmark', JSON.stringify(updated));
    setBookmark(false);
    alert("News removed.");
  };

  return (
    <>
      <Stack.Screen
        options={{
          //back button
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='arrow-back' size={22} />
            </TouchableOpacity>
          ),
          //bookmark button. It set the article  to be bookmarked or no
          headerRight: () =>
            news ? (
              <TouchableOpacity
                onPress={() =>
                  bookmark
                    ? removeBookmark(news.article_id)
                    : saveBookmark(news.article_id)
                }
              >
                <Ionicons
                  name={bookmark ? 'heart' : 'heart-outline'}
                  size={22}
                  color={bookmark ? 'red' : Colors.black}
                />
              </TouchableOpacity>
            ) : null,
          title: ``,
        }}
      />
 {/* code to show button in the screen that will open the browser. Using expo-web-browser
some links don't work in the webViewer, so the browser opening is a solution */}
      {isLoading ? (
        <Loading size="large" />
      ) : news && news.link ? (
        <View style={styles.container}>
          <Text style={styles.title}>Click below to read the full article:</Text>
          <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(news.link)}>
            <Text style={styles.link}>Open news in browser</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text>News not found.</Text>
        </View>
      )}
    </>
  );
};

export default NewsDetails;

//page style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  link: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
