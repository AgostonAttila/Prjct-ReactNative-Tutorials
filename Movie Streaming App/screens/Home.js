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

import { Profiles } from "../components";

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
                      <Text style={{ marginLeft: SIZES.base, color: COLORS.white, ...FONTS.h3 }}>Play Now</Text>
                    </View>
                    {item.stillWatching.lenght > 0 && (
                      <View
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Still Watching</Text>
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

  const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width);

  function renderDots() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexdirection: "row",
          marginTop: SIZES.padding,
        }}
      >
        {dummyData.newSeason.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const dotWith = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 20, 6],
            extrapolate: "clamp",
          });

          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={{
                borderRadius: SIZES.radius,
                marginHorizontal: 3,
                width: dotWith,
                height: 6,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  }

  function renderContinueWatchingSection() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 1, color: Colors.white, ...FONTS.h2 }}>Continue Watching</Text>
          <Image source={icons.right_arrow} style={{ width: 20, height: 20, tintColor: COLORS.primary }} />
        </View>

        <FlatList
          horizontal
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
          }}
          data={dummyData.continueWatching}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback onPress={() => navigation.navigate("MovieDetail", { selectedMovie: item })}>
                <View
                  style={{
                    marginLeft: 0 ? SIZES.padding : 20,
                    marginRight: index == dummyData.continueWatching.lenght - 1 ? SIZES.padding : 0,
                  }}
                >
                  <Image
                    source={item.thumbnail}
                    resizeMode="cover"
                    style={{
                      width: SIZES.width / 3,
                      height: SIZES.width / 3 + 60,
                      borderRadius: 20,
                    }}
                  />
                  <Text style={{ marginTop: SIZES.base, color: Colors.white, ...FONTS.h4 }}>{item.name}</Text>

                  <ProgressBar
                    containerStyle={{
                      marginTop: SIZES.radius                   
                    }}
                    barStyle={{
                      height: 3,
                    }}
                    barPercententage={item.overallProgress}
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {renderNewSeasonSection()}
        {renderDots()}
        {renderContinueWatchingSection()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
