import React, { useState, useEffect, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserDashboard from "./screens/UserDashboard";
import UserProfile from "./screens/UserProfile";
import { AuthContext } from "./AuthProvider";
import Quiz from "./screens/Quiz";
import QuizSingle from "./screens/QuizSingle";
import UserTakenQuiz from "./screens/UserTakenQuiz";
import UserTakenQuizResult from "./screens/UserTakenQuizResult";
import ShowResultComp from "./screens/ShowResultComp";

// Navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function QuizStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{ title: "Quiz Test List" }}
      />
      <Stack.Screen
        name="QuizSingle"
        component={QuizSingle}
        options={{ headerShown: false, title: "Quiz Questions" }}
      />
    </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator initialRouteName="UserDashboard">
      <Stack.Screen
        name="UserDashboard"
        component={UserDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name="UserTakenQuiz"
        component={UserTakenQuiz}
        options={{ headerShown: true, title: "My quiz test result" }}
      />
      <Stack.Screen
        name="UserTakenQuizResult"
        component={UserTakenQuizResult}
        options={{ headerShown: false, title: "All questions and answers" }}
      />
    </Stack.Navigator>
  );
}

export default function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="UserStack"
      screenOptions={{
        tabBarActiveTintColor: "#2B547E",
      }}
    >
      <Tab.Screen
        name="UserStack"
        component={UserStack}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="QuizStack"
        component={QuizStack}
        options={{
          tabBarLabel: "Quiz Test",
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="head-question"
              color={color}
              size={40}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
