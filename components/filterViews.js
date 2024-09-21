import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { hp } from "../helpers/comment";
import { theme } from "../constants/theme";
import {capitalize} from "lodash"
const titleMapping = {
    order: "Thứ tự",
    orientation: "Hướng ảnh",
    type: "Loại hình ảnh",
    colors: "Màu sắc",
    // Thêm các trường hợp khác nếu cần
  };

const SectionView = ({ title, content }) => {
    const displayTitle = titleMapping[title] || title;
  return (
    <View style={styles.sectionContainter}>
      <Text style={styles.sectionTitle}>{displayTitle}</Text>

      <View>{content}</View>
    </View>
  );
};

export const CommonFilterRow = ({ data, filterName, filters, setFilters }) => {
    const onselect = (item)=>{
        setFilters({...filters,[filterName]:item})
    }
  return (
    <View style={styles.flexRowWrap}>
      
        {data &&
          data.map((item, index) => {
            let isActive = filters && filters[filterName] == item;
            let backgroundColor = isActive ? theme.color.neutral(0.7):'white'
            let color = isActive ? 'white':theme.color.neutral(0.7)
            return (
              <Pressable
              onPress={()=>onselect(item)}
              key={item.en} style={[styles.outlinebutton,{backgroundColor}]}>
                <Text style={[styles.outlinebuttonText,{color}]}>{capitalize(item.vi)}</Text>
              </Pressable>
            );
          })}
      
    </View>
  );
};

export const ColorFilterRow = ({ data, filterName, filters, setFilters }) => {
    const onselect = (item)=>{
        setFilters({...filters,[filterName]:item})
    }
  return (
    <View style={styles.flexRowWrap}>
      
        {data &&
          data.map((item, index) => {
            let isActive = filters && filters[filterName] == item;
            let borderColor = isActive ? theme.color.neutral(0.4):'white'
            let color = isActive ? 'white':theme.color.neutral(0.7)
            return (
              <Pressable
              onPress={()=>onselect(item)}
              key={item.en}>
                <View style={[styles.colorWrapper,{borderColor}]}>
                    <View style={[styles.color,{backgroundColor:item.en}]}/>
                </View>
              </Pressable>
            );
          })}
      
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainter: {
    gap: 8,
  },

  sectionTitle: {
    fontSize: hp(2.4),
    fontWeight: theme.fontWeights.medium,
    color: theme.color.neutral(0.8),
  },

  outlinebutton:{
    padding:8,
    paddingHorizontal:14,
    borderWidth:1,
    borderColor:theme.color.black,
    borderRadius:theme.radius.xs,
    borderCurve:"continuous",
  },

  flexRowWrap:{
    gap:10,
    flexDirection:'row',
    flexWrap:'wrap'
  },

  outlinebuttonText:{
  },
  colorWrapper:{
    padding:3,
    borderRadius:theme.radius.sm,
    borderWidth:2,
    borderCurve:'continuous'
  },
  color:{
    height:30,
    width:40,
    borderRadius:theme.radius.sm,
    borderCurve:'continuous',
    borderWidth:1,
    borderColor:theme.color.gray
  }
});
export default SectionView;
