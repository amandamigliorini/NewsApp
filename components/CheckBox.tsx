import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

type Props = {
    label: string;
    checked: boolean;
    onPress: () => void;
}

//this component will create a box with the name of countries or categories on the discover screen
//it uses Animated styles to create the style that shows if the box is checked or not
const CheckBox = ({label, checked, onPress}: Props) => {
    const rnAnimatedContainerStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(checked ? "rgba(239, 142, 82, 0.1)" : 'transparent', {duration: 150}
            ),
            borderColor: withTiming(checked ? Colors.tint : Colors.black, {duration: 150 },
            ),
            paddingLeft: 16,
            paddingRight: checked ? 10 : 16,
        };
    }, [checked]);

    const rnTextStyle = useAnimatedStyle(() => {
        return {
            color: withTiming(checked ? Colors.tint : Colors.black, {
                duration: 150,
            }),
        };
    }, [checked]);

  return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Animated.View 
          style={[styles.container, rnAnimatedContainerStyle]} 
          layout={LinearTransition.springify().mass(0.8)}>
          <Animated.Text style={[styles.label, rnTextStyle]}>{label}</Animated.Text>
          {checked && (
            <Animated.View style={styles.iconWrapper} entering={FadeIn.duration(350)} exiting={FadeOut}>
              <AntDesign name='checkcircle' size={14} color={Colors.tint}/>
            </Animated.View>
          )}
        </Animated.View>
      </TouchableOpacity>
  )
}

export default CheckBox

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 8,
    borderColor: Colors.black, 
    borderRadius: 32,
  },
  label: {
    fontSize: 14,
    color: Colors.black,
  },
  iconWrapper: {
    marginLeft: 8,
    height: 14,
    width: 14,
  }
})