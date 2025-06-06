import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'

type Props = {
    onCategoryChanged: (category: string) => void;
}
//categories component will display the trending now news list
//it updates the list when the category is changed
const Categories = ({onCategoryChanged}: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectCategory = (index: number) =>{
        const selected = itemRef.current[index];
        setActiveIndex(index);

        selected?.measure((x) => {
            scrollRef.current?.scrollTo({x:x-20, y:0, animated: true})
        });

        onCategoryChanged(newsCategoryList[index].slug)
    };

  return (
    <View>
      <Text style={styles.title}>Trending Now</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.itemsWrapper}>
        {newsCategoryList.map((item, index) => (
            <TouchableOpacity ref={(el) => itemRef.current[index] = el } 
            key={index} 
            style={[styles.item, activeIndex === index && styles.itemActive]}
            onPress={() => handleSelectCategory(index)}
            >
                <Text style={[styles.itemText, activeIndex === index && styles.itemTextActive]}>{item.title}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 20,
  },
  itemsWrapper: {
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  itemText: {
    color: Colors.darkGrey,
    fontSize: 14,
    letterSpacing: 0.5,    
  },
  itemActive: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  itemTextActive: {
    fontWeight: '600',
    color: Colors.white,
  }
})