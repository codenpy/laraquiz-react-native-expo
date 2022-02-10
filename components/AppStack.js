import React, { useState, useEffect, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserDashboard from "./screens/UserDashboard";
import UserProfile from "./screens/UserProfile";
import DoctorDashboard from "./screens/DoctorDashboard";
import { AuthContext } from "./AuthProvider";
import DoctorProfile from "./screens/DoctorProfile";
import Quiz from "./screens/Quiz";
import QuizSingle from "./screens/QuizSingle";

// Navigation
const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { user, setUser, logout } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Quiz" component={Quiz} options={{ title: "Quiz" }} />
      <Stack.Screen
        name="QuizSingle"
        component={QuizSingle}
        options={{ headerShown: false, title: "Quiz Questions" }}
      />

      {/* <Stack.Screen
        name="UserDashboard"
        component={UserDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorProfile"
        component={DoctorProfile}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ title: "Edit Profile" }}
      /> */}
    </Stack.Navigator>
  );
}
