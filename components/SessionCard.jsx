
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const SessionCard = ({ title,note, athlete:{username,avatar},sportType,image }) => {
  

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-xl text-secondary"
              numberOfLines={1}
            >
              {username}
            </Text>
            <Text
              className="font-psemibold text-sm text-logo"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={3}
            >
              {note}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} tintColor={"#252424"} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      <View className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center">
          <Image
            source={{ uri: image }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
      </View>
    </View>
  );
};

export default SessionCard;