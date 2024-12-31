import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import SearchInput from '@/components/SearchInput'
import Famous from '@/components/Famous'
import EmptyState from '@/components/EmptyState'
import SessionCard from '@/components/SessionCard'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import { StatusBar } from 'expo-status-bar';

const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);






  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () =>{
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) =>(
          <SessionCard  
            title={item.title}
            note={item.note}
            athlete={item.athlete}
            sportType={item.sportType}
            image={item.image}
          /> 
        )}
        ListHeaderComponent={() => (
          <View className='my-8 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View className='mt-5'>
                <Text className='font-pmedium text-lg text-secondary-200'>
                  Welcome back,
                </Text>
                <Text className='text-3xl font-psemibold text-logo'>
                  {user?.username}
                </Text>
              </View>
              <View className='w-30 h-10 mr-4'>
                <Image
                  source={images.logoSmall}
                  className='w-28 h-28'
                  resizeMode='contain'
                />
              </View>
            </View>
           
            <SearchInput/>
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Sports
              </Text>

              <Famous posts={latestPosts ?? []} />
            </View>
          </View>

        )}
        ListEmptyComponent={()=>(
          <EmptyState
            title = "No Posts Found"
            subtitle="Be the first one to share your workout"
          />
        )}
        refreshControl={<RefreshControl
        refreshing={refreshing} onRefresh={onRefresh}/>}
      />
      <StatusBar backgroundColor={'#f6f4f0'} style='dark'></StatusBar>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})