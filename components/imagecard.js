import React from "react";
import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import { data } from "../constants/data";
import { getImageSize, hp, wd } from "../helpers/comment";
import { theme } from "../constants/theme";
import Animated, { FadeInRight } from "react-native-reanimated";
import { MasonryFlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
const ImageCard = ({ item, index, columns ,router}) => {

  const getImageHight = () => {
    let { imageHight: height, imageWitdth: width } = item;
    return { height:getImageSize(height,width) };
  };

  const isLastInRow = ()=>{
    return (index+1)%columns ===0
  }
  return (
    <Pressable 
    onPress={()=>{router.push({pathname:'home/image',params:{...item}})}}
    style={[styles.imageWrapper,!isLastInRow() && styles.spacing]}>
      <Image
        style={[styles.image, getImageHight()]}
        source={{ uri: item?.webformatURL }}
        transition={1000}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height:300
  },
  imageWrapper:{
    backgroundColor:theme.color.gray,
    borderRadius:theme.radius.xl,
    borderCurve:'continuous',
    overflow:'hidden',
    marginBottom:wd(2)
  },
  spacing:{
    marginRight:wd(2)
  }
});

export default ImageCard;
