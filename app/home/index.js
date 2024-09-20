import { wd, hp } from "../../helpers/comment";
import { theme } from "../../constants/theme";
import { apiCall } from "../../api";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,Text,StyleSheet,
  Pressable,ScrollView,TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { debounce } from "lodash";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";

import Categories from "../../components/categories";
import Images from "../../components/images";

var page = 1;

const HomeScreen = () => {
  const router = useRouter();
  
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [images,setImage]=useState([])

  const handleChangeCategory = (cat) => {
    setActiveCategory(cat);
    clearSearch()
    setImage([])
    page = 1;
    let params = {
      page,
    }
    if(cat)params.category = cat
    fetchImage(params,false)
  };

  const clearSearch = ()=>{
    setSearch("")
    searchInputRef?.current?.clear()

  }
  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async (params = { page: 1 },append=false) => {
     let res = await apiCall(params);
     if(res.success && res?.data?.hits)
     {  
        if(append)
        {
           setImage([...images,...res.data.hits])
        }
        else
        {
            setImage([...res.data.hits])
        }
     }
  };

  const handleSearch = (text)=>{
    setSearch(text)

    if(text.length > 2)
    {
      page = 1
      setImage([])
      setActiveCategory(null)
      fetchImage({page,q:text})
    }

    if(text=="")
    {
      page = 1
      searchInputRef?.current?.clear()
      setActiveCategory(null)
      setImage([])
      fetchImage({page})
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch,400),[])
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Noobs</Text>
        </Pressable>

        <Pressable>
          <FontAwesome name="bars" size={22} color={theme.color.neutral(0.7)} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 12 }}>
        {/* search bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather name="search" size={24} color={theme.color.neutral(0.9)} />
          </View>

          <TextInput
            placeholder="Tìm kiếm ảnh ..."
            style={styles.searchInput}
            ref={searchInputRef}
            onChangeText={handleTextDebounce}
          />

          {search && (
            <Pressable 
            onPress={()=>handleSearch("")}
            style={styles.closeIcon}>
              <Ionicons
                name="close"
                size={24}
                color={theme.color.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>

        {/* categories */}
        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        {/* view image */}
        <View>
            {images.length>0 && (
                <Images images={images}/>
            )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wd(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.color.neutral(0.9),
  },
  searchBar: {
    marginHorizontal: wd(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    backgroundColor: theme.color.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 18,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.color.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
});
export default HomeScreen;
