import React from 'react';
import { FlatList, View, Text, StyleSheet, Pressable } from 'react-native';
import { data } from '../constants/data';
import { hp, wd,getColumnCount } from '../helpers/comment';
import { theme } from '../constants/theme';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { MasonryFlashList } from '@shopify/flash-list';
import ImageCard from './imagecard';

const Images = ({images,router }) => {
    const columns = getColumnCount()
    return (
        <View style={styles.container}>
           <MasonryFlashList
            data={images}
            numColumns={columns}
            renderItem={({item,index})=><ImageCard  router={router} item={item} index={index} columns={columns}/>}
            estimatedItemSize={200}
            contentContainerStyle={styles.listContainerStyle}
            initiaNumToRender={1000}

            />
        </View>
    );
};



const styles = StyleSheet.create({
    container:{
        minHeight:3,
        width:wd(100)
    },
    listContainerStyle:{
        paddingHorizontal:wd(4)
    }
});

export default Images;
