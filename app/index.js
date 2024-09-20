import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { wd, hp } from '../helpers/comment'
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';
const WellcomeScreen = () => {
    const router = useRouter()
    return (
        <View style={styles.container}>

            <StatusBar style="light" />

            <Image
                source={require('../assets/images/welcome.png')}
                style={styles.bgImage}
                resizeMode='cover'
            />

            <Animated.View
                entering={FadeInDown.duration(600)}
                style={{ flex: 1 }}>

                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'white', 'white']}
                    style={styles.gradient}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.8 }}
                />

                {/* content */}
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>
                        Noobs
                    </Text>

                    <Text style={styles.punchline}>
                        Hình ảnh, chia sẽ và miễn phí
                    </Text>

                    <View>
                        <Pressable
                        onPress={()=>router.push('home')}
                         style={styles.startButton}>
                            <Text style={styles.startText}>
                                Bắt đầu
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    bgImage: {
        width: wd(100),
        height: hp(100),
        position: 'absolute',
    },

    gradient: {
        width: wd(100),
        height: hp(65),
        bottom: 0,
        position: 'absolute',
    },

    contentContainer:{
        flex:1,
        alignItems:'center',
        gap:14,
        justifyContent:'flex-end'
    },

    title:{
        fontSize:hp(7),
        color:theme.color.neutral(0.9),
        fontWeight:theme.fontWeights.medium
    },

    punchline:{
        fontSize:hp(2),
        letterSpacing:1,
        marginBottom:10,
        fontWeight:theme.fontWeights.medium
    },

    startButton:{
        marginBottom:50,
        backgroundColor:theme.color.neutral(0.9),
        padding:15,
        paddingHorizontal:90,
        borderRadius:theme.radius.xl,
        borderCurve:'continuous'
    },

    startText:{
        color:theme.color.white,
        fontSize:hp(3),
        fontWeight:theme.fontWeights.medium,
        letterSpacing:1
    }
})
export default WellcomeScreen;