import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors';
import { transform } from '@babel/core'
import { Link } from 'expo-router'


type Props = {
    slideItem: NewsDataType;
    index: number;
    scrollX: SharedValue<number>;
}

const {width} = Dimensions.get('screen');

const SliderItem = ({slideItem, index, scrollX}: Props) => {
    const rnStyle = useAnimatedStyle(() => {
      //animation to the slide
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index* width, (index + 1) * width],
                        [-width * 0.15, 0, width * 0.15],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [0.9, 1, 0.9],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });
    
  return (
    //each slider item is a new and it has a link and a touchableOpacity 
    //to be clicked and open the news[id] page
    <Link href={{ pathname: "../news/[id]", params: { id: slideItem.article_id } }} asChild>
      <TouchableOpacity>
        <Animated.View style={[styles.itemWrapper, rnStyle]} key={slideItem.article_id}>
          <Image source={{uri: slideItem.image_url}} style={styles.imageSld}/>
          <LinearGradient colors={["transparent", 'rgba(0, 0, 0, 0.8)']} style={styles.background}>
            <View style={styles.sourceInfo}>     
                {slideItem.source_icon && (
                    <Image source={{uri:slideItem.source_icon}} style={styles.sourceIcon}/>
                )}
                <Text style={styles.sourceName}>{slideItem.source_name}</Text>
            </View>
            <Text style={styles.title} numberOfLines={2}>{slideItem.title}</Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  )
}

export default SliderItem

//page style
const styles = StyleSheet.create({
  itemWrapper: {
    position: 'relative',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSld: {
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  background: {
    position: 'absolute',
    left: 30,
    right: 0,
    top: 0,
    width: width - 60,
    height: 180,
    borderRadius: 20,
    padding: 20,
  },
  sourceIcon: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  sourceInfo: {
    flexDirection: 'row',
    position: 'absolute',
    top: 85,
    paddingHorizontal: 20, 
    alignItems: 'center',
    gap: 10,
  },
  sourceName: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600'
  },
  title: {
    fontSize: 14,
    color: Colors.white,
    position: 'absolute',
    top: 120,
    paddingHorizontal: 20,
    fontWeight: '600'
  }
})