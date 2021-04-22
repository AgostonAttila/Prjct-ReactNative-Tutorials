import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Amnimated,
  ScrollView,
} from "react-native";
import Animated from "react-native-reanimated";
import { Colors } from "react-native/Libraries/NewAppScreen";

import {Profiles} from "../components"

import { dummyData, icons, images, COLORS, SIZES, FONTS } from "../constants";

const Home = ({ navigation }) => {
  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;

  function renderHeader() {
    return (
      <View
        style={{
          flexdirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
          }}
          onPress={() => console.log("Profile")}
        >
          <Image
            source={Image.profile_photo}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
            }}
            onPress={() => console.log("ScreenMirror")}
          >
            <Image
              source={icons.airplay}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.primary,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }

  function renderNewSeasonSection() {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInnterval={SIZES.width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        data={dummyData.newSeadon}
        keyExtractor={(item) => `${item.id}`}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: newSeasonScrollX } } }], {
          useNativeDriver: false,
        })}
        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback onPress={() => navigate("MovieDetail", { selectedMovie: item })}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: SIZES.width,
                }}
              >
                <ImageBackground
                  source={item.thumbnail}
                  resizeMode="cover"
                  style={{
                    justifyContent: "flex-end",
                    width: SIZES.width * 0.85,
                    height: SIZES.height * 0.85,
                  }}
                  imageStyle={{
                    borderRadius: 40,
                  }}
                >
                  <View
                    style={{
                      flexdirection: "row",
                      height: 60,
                      width: "100%",
                      marginBottom: SIZES,
                      radius,
                      paddingHorizontal: SIZES.radius,
                      backgroundColor: COLORS.primary,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: COLORS.transparentWhite,
                        }}
                      >
                        <Image
                          source={icons.play}
                          resizeMode="contain"
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.primary,
                          }}
                        />
                      </View>
                      <Text style={{ marginLeft: SIZES.base, color: Colors.white, ...FONTS.h3 }}>Play Now</Text>
                    </View>
                    {item.stillWatching.lenght > 0 && (
                      <View
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: Colors.white, ...FONTS.h4 }}>Still Watching</Text>
                        <Profiles profiles={item.stillWatching} />
                      </View>
                    )}
                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>{renderNewSeasonSection()}</ScrollView>
    </SafeAreaView>
  );
};

export default Home;
