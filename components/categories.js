import React from 'react';
import { FlatList, View, Text, StyleSheet, Pressable } from 'react-native';
import { data } from '../constants/data';
import { hp, wd } from '../helpers/comment';
import { theme } from '../constants/theme';
import Animated, { FadeInRight } from 'react-native-reanimated';

const Categories = ({ activeCategory, handleChangeCategory }) => {
    return (
        <FlatList
            horizontal
            contentContainerStyle={styles.flatlistContainer}
            showsHorizontalScrollIndicator={false}
            data={data.categories}
            keyExtractor={item => item}
            renderItem={({ item, index }) => (
                <CategoryItem
                    title={item}
                    index={index}
                    isActive = {activeCategory==item}
                    handleChangeCategory={handleChangeCategory}
                />
            )}
        />
    );
};

const CategoryItem = ({ title,index,isActive,handleChangeCategory }) => {
    let TextColor = isActive ? theme.color.white:theme.color.neutral(0.8)
    let backgroundColor = isActive ? theme.color.neutral(0.8):theme.color.white
    return (
        <Animated.View entering={FadeInRight.delay(index*200).duration(1000)}>
            <Pressable 
            onPress={()=>handleChangeCategory(isActive?null:title)} 
            style={[styles.category,{backgroundColor}]}
            >
            <Text style={[styles.title,{TextColor}]}>{title}</Text>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    flatlistContainer: {
        paddingHorizontal:wd(4),
        gap:8
    },
    category: {
        padding:12,
        paddingHorizontal:15,
        borderWidth:1,
        borderColor:theme.color.gray,
        borderRadius:theme.radius.lg,
        borderCurve:'continuous'

    },
    title: {
      fontSize:hp(1.8),
      fontWeight:theme.fontWeights.medium
    },
});

export default Categories;
