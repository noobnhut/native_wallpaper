import { wd, hp } from "../../helpers/comment";
import { theme } from "../../constants/theme";
import { apiCall } from "../../api";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { debounce } from "lodash";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";

import Categories from "../../components/categories";
import Images from "../../components/images";
import FilterModals from "../../components/filtermodal";
var page = 1;

const HomeScreen = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImage] = useState([]);
  const [filters, setFilters] = useState(null);
  const modalRef = useRef(null);
  // Loại bỏ trường 'vi' khỏi từng bộ lọc
  const getFilters = (filters) => {
    if (filters == null) {
      return null;
    }
    return Object.entries(filters).reduce((acc, [key, value]) => {
      // Nếu value là đối tượng, chỉ giữ giá trị của trường 'en'

      acc[key] = value.en; // Chỉ giữ giá trị của trường 'en'

      return acc;
    }, {});
  };

  const handleChangeCategory = (cat) => {
    const cleanedFilters = getFilters(filters);
    setActiveCategory(cat);
    clearSearch();
    setImage([]);
    page = 1;
    let params = {
      page,
      ...cleanedFilters,
    };
    if (cat) params.category = cat;
    fetchImage(params, false);
  };

  const clearSearch = () => {
    setSearch("");
    searchInputRef?.current?.clear();
  };
  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async (params = { page: 1 }, append = false) => {
    let res = await apiCall(params);
    if (res.success && res?.data?.hits) {
      if (append) {
        setImage([...images, ...res.data.hits]);
      } else {
        setImage([...res.data.hits]);
      }
    }
  };

  const openFilterModal = () => {
    modalRef?.current?.present();
  };

  const closeFilterModal = () => {
    modalRef?.current?.close();
  };

  const applyFilter = () => {
    const cleanedFilters = getFilters(filters);
    if (filters) {
      page = 1;
      setImage([]);
      let params = {
        page,
        ...cleanedFilters,
      };
      if (activeCategory) params.categories = activeCategory;
      if (search) params.q = search;
      fetchImage(params, false);
    }

    closeFilterModal();
  };

  const resetFilter = () => {
    setFilters(null);
    page = 1;
    setImage([]);
    let params = {
      page,
    };
    if (activeCategory) params.categories = activeCategory;
    if (search) params.q = search;
    fetchImage(params, false);

    closeFilterModal();
  };

  const clearThisFilter=(key)=>{
    delete filters[key]
    applyFilter()
  }

  const handleSearch = (text) => {
    const cleanedFilters = getFilters(filters);
    setSearch(text);

    if (text.length > 2) {
      page = 1;
      setImage([]);
      setActiveCategory(null);
      fetchImage({ page, q: text, ...cleanedFilters }, false);
    }

    if (text == "") {
      page = 1;
      searchInputRef?.current?.clear();
      setActiveCategory(null);
      setImage([]);
      fetchImage({ page, ...cleanedFilters }, false);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Noobs</Text>
        </Pressable>

        <Pressable onPress={openFilterModal}>
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
              onPress={() => handleSearch("")}
              style={styles.closeIcon}
            >
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

{/* filter */}
{
  filters && (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {
          Object.keys(filters).map((key,index)=>{
            return(
              <View key={key} style={styles.filterItems}>
                {
                  key==='colors'?(
                    <View style={{
                      height:20,
                      width:30,
                      borderRadius:7,
                      backgroundColor:filters[key].en
                    }}></View>
                  )
                :(
                  <Text style={styles.filterItemText}>{filters[key].vi}</Text>
                )}
                <Pressable style={styles.filterCloseIcon} onPress={()=>clearThisFilter(key)}>
                <Ionicons
                name="close"
                size={14}
                color={theme.color.neutral(0.9)}
              />
                </Pressable>
              </View>
            )
          })
        }

      </ScrollView>
    </View>
  )
}
        {/* view image */}
        <View>{images.length > 0 && <Images images={images} />}</View>
        {/* loading view */}
        <View
          style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}
        >
          <ActivityIndicator size="larger" />
        </View>
      </ScrollView>

      {/* filter modal */}
      <FilterModals
        modalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        onClose={closeFilterModal}
        onApply={applyFilter}
        onReset={resetFilter}
      />
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
  filters:{
    paddingHorizontal:wd(4),
    gap:10
  },
  filterItems:{
    backgroundColor:theme.color.gray,
    padding:3,
    flexDirection:'row',
    alignItems:'center',
    borderRadius:theme.radius.xs,
    padding:8,
    gap:10,
    paddingHorizontal:10
  },
  filterItemText:{
    fontSize:hp(1,9)
  },
  closeIcon:{
    backgroundColor:theme.color.neutral(0.2),
    padding:4,
    borderRadius:7
  }
});

export default HomeScreen;
