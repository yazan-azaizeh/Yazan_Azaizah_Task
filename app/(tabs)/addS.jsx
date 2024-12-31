import { useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { images } from "../../constants";
import { icons } from "../../constants";
import { createWorkout } from "../../lib/appwrite";
import  FormField  from "../../components/FormField";
import  CustomButton  from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: null,
    note: "",
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          image: result.assets[0],
        });
      }
    }
  };

  const submit = async () => {
    if (
      (form.note === "") ||
      (form.title === "") ||
      !form.image 
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createWorkout({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log(error);
    } finally {
      setForm({
        title: "",
        image: null,
        note: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <View className='justify-between items-start flex-row mb-6'>
          <View className='mt-5'>
            <Text className="text-2xl mt-3 text-logo font-psemibold">Become an Athlete</Text>
          </View>
          <View className='w-30 h-10 mr-4'>
            <Image
              source={images.logoSmall}
              className='w-28 h-28'
              resizeMode='contain'
            />
          </View>
        </View>
        <FormField
          title="Workout Title"
          value={form.title}
          placeholder="Give your workout a title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Workout Picture
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-logo rounded-2xl flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-5 h-5"
                  />
                </View>
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Workout Description"
          value={form.note}
          placeholder="Write the notes...."
          handleChangeText={(e) => setForm({ ...form, note: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;