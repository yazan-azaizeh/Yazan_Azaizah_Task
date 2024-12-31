import { StyleSheet, Text, View, ScrollView,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import {images} from '../../constants'
import FormField from '@/components/FormField'
import { Link,router } from 'expo-router'
import { createUser } from "../../lib/appwrite"
import { useGlobalContext } from '@/context/GlobalProvider'

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }
    setisSubmitting(true);
    try{
      const result = await createUser(form.email,form.password,form.username)

      setUser(result);
      setIsLoggedIn(true)
      router.replace('/home')
    }
    catch (error){
      Alert.alert('Error', error.message)
    }
    finally{
      setisSubmitting(false)
    }
    
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logoSmall}
          resizeMode='contain' className='w-[400px] h-[200px] '/>
          <Text className='text-2xl text-secondary-200 text-semibold mt-10 font-psemibold'>Register and be Part of Our Family</Text>
          <FormField 
            title = "Username"
            value ={form.username}
            handleChangeText={(e) => setForm({...form,username: e})}
            otherStyles="mt-10"
            placeholder="Enter your username"
          />
          <FormField 
            title = "Email"
            value ={form.email}
            handleChangeText={(e) => setForm({...form,email: e})}
            otherStyles="mt-7"
            KeyboardType="email-address"
            placeholder="Enter your email"
          />
          <FormField 
            title = "Password"
            value ={form.password}
            handleChangeText={(e) => setForm({...form,password: e})}
            otherStyles="mt-7"
            placeholder="Enter your password"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}/>
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Have an account already?
            </Text>
            <Link href="/signin" className='text-lg font-psemibold text-secondary'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({})