import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { hp, wd } from "../../helpers/comment";
import { useLocalSearchParams, useRouter } from "expo-router";
import { theme } from "../../constants/theme";
import { Image } from "expo-image";
import { Entypo, Octicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library"; // Import MediaLibrary
import Toast from "react-native-toast-message";

const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [status, setStatus] = useState("loading");
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  let uri = item?.webformatURL;
  const fileName = item?.previewURL?.split("/").pop();
  const imageUrl = uri;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

  useEffect(() => {
    // Yêu cầu quyền lưu ảnh nếu chưa có
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, [permissionResponse]);

  const onload = () => {
    setStatus("");
  };

  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
  };

  const toastConfig = {
    success: ({ text1, props, ...rest }) => (
      <View style={styles.toast}>
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    ),
  };

  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;
    const maxWidth = Platform.OS === "web" ? wd(50) : wd(92);
    const calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;
    if (aspectRatio < 1) calculatedWidth = calculatedHeight * aspectRatio;

    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  const handleDownloadImage = async () => {
    setStatus("downloading");
    let uri = await downloadFile();
    if (uri) {
      await saveToGallery(uri); // Lưu ảnh vào thư viện
      showToast("Tải ảnh thành công");
    }
  };

  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);
      setStatus("");
      return uri;
    } catch (error) {
      console.log(error);
      setStatus("");
      return null;
    }
  };

  const saveToGallery = async (fileUri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    } catch (error) {
      console.log("Error saving file to gallery:", error);
    }
  };

  const handleShareImage = async () => {
    setStatus("sharing");
    let uri = await downloadFile();
    if (uri) {
      await Sharing.shareAsync(uri);
      setStatus("");
    }
  };

  return (
    <BlurView tint="dark" intensity={60} style={styles.container}>
      <View>
        <View style={styles.loading}>
          {status === "loading" && (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>
        <Image
          transition={100}
          style={[styles.image, getSize()]}
          source={uri}
          onLoad={onload}
        />
      </View>
      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Octicons name="x" size={24} color="white" />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInDown.springify().delay(100)}>
          <Pressable onPress={handleDownloadImage} style={styles.button}>
            {status === "downloading" ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Octicons name="download" size={24} color="white" />
            )}
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInDown.springify().delay(200)}>
          <Pressable onPress={handleShareImage} style={styles.button}>
            {status === "sharing" ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Entypo name="share" size={24} color="white" />
            )}
          </Pressable>
        </Animated.View>
      </View>
      <Toast config={toastConfig} visibilityTime={2500} />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wd(4),
  },
  image: {
    borderRadius: theme.radius.lg,
    orderWidth: 2,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    margin: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  button: {
    height: hp(6),
    width: hp(6),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.lg,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  toast: {
    padding: 15,
    paddingHorizontal: 10,
    borderRadius: theme.radius.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  toastText: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.semibold,
    color: theme.color.white,
  },
});

export default ImageScreen;
