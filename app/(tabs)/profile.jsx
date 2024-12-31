import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity,RefreshControl } from "react-native";
import InfoBox from '@/components/InfoBox'
import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from '@/components/EmptyState'
import SessionCard from '@/components/SessionCard'
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
  const [refreshing, setRefreshing] = useState(false)
  
  const onRefresh = async () =>{
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  const logout = async () => {
    try{
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

     router.replace("/(auth)/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <SessionCard  
            title={item.title}
            note={item.note}
            athlete={item.athlete}
            sportType={item.sportType}
            image={item.image}
          /> 
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-2xl"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="26.8k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
      <StatusBar backgroundColor={'#f6f4f0'} style='dark'></StatusBar>
    </SafeAreaView>
  );
};

export default Profile;