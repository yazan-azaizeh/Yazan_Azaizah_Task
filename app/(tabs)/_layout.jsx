import { Text, View , Image} from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import {icons} from '../../constants'
import '../../global.css';




const Tabicon = ({icon,color,name,focused}) => {
    return(
        <View className="items-center justify-center gap-2 w-64" style={{marginTop: 25}}>
            <Image 
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6'
            />
        <Text className={`${focused ? 'font-psemibold':
             'font-pregular'} text-xs text-primary`}>
            {name}
        </Text>
        </View>
        
    )
}

const TabsLayout = () => {
  return (
    <>
        <Tabs 
            screenOptions={{
                tabBarShowLabel:false,
                tabBarActiveTintColor:'#74b7a0',
                tabBarInactiveTintColor:'#f4ead2',
                tabBarStyle: {
                    backgroundColor:'#252424',
                    borderTopWidth:1,
                    borderTopColor: '#232533',
                    height:85,
                }
            }}
        >
            <Tabs.Screen 
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, focused}) => (
                        <Tabicon 
                        icon={icons.home}
                        color={color}
                        name="Home"
                        focused={focused}></Tabicon>
                    )
                }}
            />
            <Tabs.Screen 
                name="maps"
                options={{
                    title: "Map",
                    headerShown: false,
                    tabBarIcon: ({ color, focused}) => (
                        <Tabicon 
                        icon={icons.eye}
                        color={color}
                        name="Map"
                        focused={focused}></Tabicon>
                    )
                }}
            />
            <Tabs.Screen 
                name="addS"
                options={{
                    title: "Post",
                    headerShown: false,
                    tabBarIcon: ({ color, focused}) => (
                        <Tabicon 
                        icon={icons.plus}
                        color={color}
                        name="Post"
                        focused={focused}></Tabicon>
                    )
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ color, focused}) => (
                        <Tabicon 
                        icon={icons.profile}
                        color={color}
                        name="Profile"
                        focused={focused}></Tabicon>
                    )
                }}
            />
        </Tabs>
    </>
  )
}

export default TabsLayout