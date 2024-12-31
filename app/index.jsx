import { Text, View,Image,ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import "@/global.css"
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import {images} from "@/constants"
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/home"/>

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height:'100%'}}> 
        <View className="w-full justify-center items-center h-[85vh] px-4"> 
          <Image source={images.logo}
            className="w-[400px] h-[400px]"
            resizeMode="contain"
          />

          <CustomButton 
            title ="Continue with Email"
            handlePress={() => router.push('/(auth)/signin')}
            containerStyles="w-full mt-20"
          />
        </View>

      </ScrollView>
      <StatusBar backgroundColor={'#f6f4f0'} style='dark'></StatusBar>
    </SafeAreaView>
  );
}
