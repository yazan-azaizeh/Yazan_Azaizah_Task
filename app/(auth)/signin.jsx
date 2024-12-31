import { StyleSheet, Text, View, ScrollView,Image,Alert,ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import {images} from '../../constants'
import FormField from '@/components/FormField'
import { Link,router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if(!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }
    setisSubmitting(true);
    try{
      await signIn(form.email,form.password)
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true)
      router.replace('/home')
    }
    catch(error){
      Alert.alert('Error', error.message)
    }
    finally{
      setisSubmitting(false)
    }
    
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[70vh] px-4 my-6'>
          <Image source={images.logoSmall}
          resizeMode='contain' className='w-[400px] h-[180px] justify-center content-center'/>
          <Text className='text-2xl text-secondary-200 text-semibold mt-0.5 font-psemibold'>Login to Stay Healthy</Text>
          <FormField 
            title = "Email"
            value ={form.email}
            handleChangeText={(e) => setForm({...form,email: e})}
            placeholder="Enter your email"
            otherStyles="mt-7"
            KeyboardType="email-address"
          />
          <FormField 
            title = "Password"
            value ={form.password}
            handleChangeText={(e) => setForm({...form,password: e})}
            placeholder="Enter your password"
            otherStyles="mt-7"

          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-12"
            isLoading={isSubmitting}
            className=""/>
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link href="/signup" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})