import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LikeScreen from '../screens/LikeScreen'
import ChatScreen from '../screens/ChatScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { NavigationContainer } from '@react-navigation/native'
import BasicInfo from '../screens/auth/BasicInfo'
import LoginScreen from '../screens/auth/LoginScreen'
import NameScreen from '../screens/auth/NameScreen'
import EmailScreen from '../screens/auth/EmailScreen'
import PasswordScreen from '../screens/auth/PasswordScreen'
import BirthScreen from '../screens/auth/BirthScreen'
import LocationScreen from '../screens/auth/LocationScreen'
import GenderScreen from '../screens/auth/GenderScreen'
import TypeScreen from '../screens/auth/TypeScreen'
import DatingType from '../screens/auth/DatingType'
import LookingFor from '../screens/auth/LookingFor'
import HomeTownScreen from '../screens/auth/HomeTownScreen'
import PreFinalScreen from '../screens/auth/PreFinalScreen'
import ShowPromptsScreen from '../screens/auth/ShowPromptsScreen'
import PromptsScreen from '../screens/auth/PromptsScreen'
import PhotoScreen from '../screens/auth/PhotoScreen'

const StackNavigation: React.FC  = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();


  function BottomTabs(){
    return(
      <Tab.Navigator screenOptions={()=>({
        tabBarShowLabel:false
      })}>
        <Tab.Screen name='Home' component={HomeScreen} options={{tabBarStyle:{backgroundColor:"#101010"},
        tabBarLabelStyle:{color:'#008397'}, headerShown:false,
        tabBarIcon:({focused})=> 
          focused ? (
              <MaterialCommunityIcons name="alpha" size={26} color="white"/>
          ):(
              <MaterialCommunityIcons name="alpha" size={26} color="#989898"/>
        ) 
      }}/>
              <Tab.Screen name='Likes' component={LikeScreen} options={{tabBarStyle:{backgroundColor:"#101010"},
        tabBarLabelStyle:{color:'#008397'}, headerShown:false,
        tabBarIcon:({focused})=> 
          focused ? (
              <Entypo name="heart" size={26} color="white"/>
          ):(
              <Entypo name="alpha" size={26} color="#989898"/>
        ) 
      }}/>
              <Tab.Screen name='Chat' component={ChatScreen} options={{tabBarStyle:{backgroundColor:"#101010"},
        tabBarLabelStyle:{color:'#008397'}, headerShown:false,
        tabBarIcon:({focused})=> 
          focused ? (
              <MaterialIcons name="chat-bubble-outline" size={26} color="white"/>
          ):(
              <MaterialIcons name="chat-bubble-outline" size={26} color="#989898"/>
        ) 
      }}/>
                    <Tab.Screen name='Profile' component={ProfileScreen} options={{tabBarStyle:{backgroundColor:"#101010"},
        tabBarLabelStyle:{color:'#008397'}, headerShown:false,
        tabBarIcon:({focused})=> 
          focused ? (
              <Ionicons name="person-circle-outline" size={26} color="white"/>
          ):(
              <Ionicons name="person-circle-outline" size={26} color="#989898"/>
        ) 
      }}/>
      </Tab.Navigator>
    )
  }

  function MainStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen name='Main' component={BottomTabs} options={{headerShown:false}}/>
      </Stack.Navigator>
    )
  }

  const AuthStack = ()=>{
    return(
      <Stack.Navigator>
              <Stack.Screen
        name="Basic"
        component={BasicInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Name"
        component={NameScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Email"
        component={EmailScreen}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="Password"
        component={PasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Birth"
        component={BirthScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Location"
        component={LocationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Gender"
        component={GenderScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Type"
        component={TypeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dating"
        component={DatingType}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LookingFor"
        component={LookingFor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Hometown"
        component={HomeTownScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Photos"
        component={PhotoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Prompts"
        component={PromptsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShowPrompts"
        component={ShowPromptsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PreFinal"
        component={PreFinalScreen}
        options={{headerShown: false}}
      />      
    
    </Stack.Navigator>
    )
  }
  
  return (
    <NavigationContainer>
        <AuthStack/>
    </NavigationContainer>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})