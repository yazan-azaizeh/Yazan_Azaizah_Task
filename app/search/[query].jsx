import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import SearchInput from '@/components/SearchInput'

import EmptyState from '@/components/EmptyState'
import SessionCard from '@/components/SessionCard'


const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

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
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-secondary-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-logo mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} refetch={refetch} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Posts Found"
            subtitle="No posts found for this search query"
          />
        )}
      />
      <StatusBar backgroundColor={'#f6f4f0'} style='dark'></StatusBar>
    </SafeAreaView>
  );
};

export default Search;