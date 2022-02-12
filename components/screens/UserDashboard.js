import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import {
  Button,
  Image,
  VStack,
  Text,
  Box,
  HStack,
  Center,
  Spacer,
  StatusBar,
  IconButton,
  Avatar,
  Heading,
} from "native-base";
import { ImageBackground, Pressable, SafeAreaView } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "../AuthProvider";

import * as SecureStore from "expo-secure-store";

import { BASE_URL } from "@env";
import Quiz from "./Quiz";
import UserProfile from "./UserProfile";

export default function UserDashboard({ navigation }) {
  const { user, setUser, logout } = useContext(AuthContext);

  //const Drawer = createDrawerNavigator();

  return (
    <Box safeArea>
      <HStack
        //bg="primary.500"
        px="5"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space="4" alignItems="center">
          <Image
            source={{
              uri: "https://i.imgur.com/J7BM7hJ.png",
            }}
            alt="logo"
            size="md"
            style={{ resizeMode: "contain" }}
          />
        </HStack>

        <HStack space="4" alignItems="center">
          <Pressable
            onPress={() => {
              navigation.navigate("UserProfile");
            }}
          >
            <Avatar bg="indigo.500" alignSelf="center" size="md">
              N
            </Avatar>
          </Pressable>
        </HStack>
      </HStack>
      <Center>
        <Heading
          mt="10"
          style={{ textAlign: "center" }}
          color="coolGray.600"
          fontWeight="medium"
          size="xl"
        >
          User Dashboard
        </Heading>
        <Heading mt="1" fontWeight="medium" size="md">
          Name: {user.userObj.name}
        </Heading>
        <Heading mt="1" fontWeight="medium" size="md">
          Email: {user.userObj.email}
        </Heading>
        <Heading mt="1" fontWeight="medium" size="md">
          Student ID: {user.userObj.student_id}
        </Heading>
      </Center>
    </Box>
  );
}
