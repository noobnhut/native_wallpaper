import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { wd, hp } from '../../helpers/comment'
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '../../constants/theme';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import Categories from '../../components/categories';
import { apiCall } from '../../api';

const HomeScreen = () => {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const searchInputRef = useRef(null)
    const [activeCategory, setActiveCategory] = useState(null)

    const handleChangeCategory = (cat) => {
        setActiveCategory(cat)
    }

    useEffect(()=>{
        fetchImage();
    },[])

    const fetchImage= async(params={page:1}) =>
    {
        let res = await apiCall(params)
        console.log(res)
    }

    const { top } = useSafeAreaInsets()
    const paddingTop = top > 0 ? top + 10 : 30;
    return (
        <View style={[styles.container, { paddingTop }]}>

            <View style={styles.header}>
                <Pressable >
                    <Text style={styles.title}>
                        Noobs
                    </Text>
                </Pressable>

                <Pressable>
                    <FontAwesome name='bars' size={22} color={theme.color.neutral(0.7)} />
                </Pressable>
            </View>

            <ScrollView
                contentContainerStyle={{ gap: 12 }}
            >
                {/* search bar */}
                <View style={styles.searchBar}>
                    <View style={styles.searchIcon}>
                        <Feather name='search' size={24} color={theme.color.neutral(0.9)} />
                    </View>

                    <TextInput
                        placeholder='Tìm kiếm ảnh ...'
                        style={styles.searchInput}
                        ref={searchInputRef}
                        onChangeText={value => setSearch(value)}
                    />

                    {search && (<Pressable style={styles.closeIcon}>
                        <Ionicons
                            name='close' size={24} color={theme.color.neutral(0.6)} />
                    </Pressable>)}

                </View>


                {/* categories */}
                <View style={styles.categories}>
                    <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15
    },
    header: {
        marginHorizontal: wd(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold,
        color: theme.color.neutral(0.9)
    },
    searchBar: {
        marginHorizontal: wd(4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        backgroundColor: theme.color.white,
        padding: 6,
        paddingLeft: 10,
        borderRadius: theme.radius.lg
    },
    searchIcon: {
        padding: 8
    },
    searchInput: {
        flex: 1,
        borderRadius: theme.radius.sm,
        paddingVertical: 18,
        fontSize: hp(1.8)
    },
    closeIcon: {
        backgroundColor: theme.color.neutral(0.1),
        padding: 8,
        borderRadius: theme.radius.sm
    }
})
export default HomeScreen;