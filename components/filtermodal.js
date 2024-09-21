import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useCallback, useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { hp } from "../helpers/comment";
import { theme } from "../constants/theme";
import { data } from "../constants/data";

import SectionView, { ColorFilterRow, CommonFilterRow } from "./filterViews";
const FilterModals = ({
  modalRef,
  onClose,
  onApply,
  onReset,
  filters,
  setFilters,
}) => {
  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.keys(sections).map((sectionName, index) => {
            let sectionView = sections[sectionName];
            let sectionData = data.filters[sectionName];
            let title = sectionName;
            return (
              <View key={sectionName}>
                <SectionView
                  title={title}
                  content={sectionView({ data: sectionData,filters,setFilters,filterName:sectionName })}
                />
              </View>
            );
          })}

          {/* action view */}
          <View style={styles.button}>
             <Pressable style={styles.resetButton} onPress={onReset}>
                <Text style={[styles.buttonText,{color:theme.color.neutral(0.9)}]}>Loại bỏ</Text>
             </Pressable>

             <Pressable style={styles.applyButton} onPress={onApply}>
                <Text style={[styles.buttonText,{color:theme.color.white}]}>Lọc</Text>
             </Pressable>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const sections = {
  order: (props) => <CommonFilterRow {...props} />,
  orientation: (props) => <CommonFilterRow {...props} />,
  type: (props) => <CommonFilterRow {...props} />,
  colors: (props) => <ColorFilterRow {...props} />,
};

const CustomBackdrop = ({ animatedIndex, style }) => {
  const containerAnimateStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overplay,
    containerAnimateStyle,
  ];

  return (
    <Animated.View style={containerStyle}>
      {/* blur background */}
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={25} />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overplay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
   // width: "100%",
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.color.neutral(0.8),
    marginBottom: 5,
  },
  button:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },
  applyButton:{
    flex:1,
    backgroundColor:theme.color.neutral(0.8),
    padding:12,
    alignItems:'center',
    borderRadius:theme.radius.md,
    borderCurve:'continuous'
  },
  resetButton:{
    flex:1,
    backgroundColor:theme.color.neutral(0.8),
    padding:12,
    alignItems:'center',
    borderRadius:theme.radius.md,
    borderCurve:'continuous',
    borderWidth:2,
    borderColor:theme.color.gray
  },
  buttonText:{
    fontSize:hp(2.2)
  }
});
export default FilterModals;
