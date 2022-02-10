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
import { AuthContext } from "../AuthProvider";

import * as SecureStore from "expo-secure-store";

import { BASE_URL } from "@env";

const userURL = `${BASE_URL}/api/user`;

export default function UserDashboard({ navigation }) {
  const { user, setUser, logout } = useContext(AuthContext);

  // useEffect(() => {
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  //   axios
  //     .get(userURL)
  //     .then((response) => {
  //       setName(response.data.name);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // }, []);

  return (
    <>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
      <Box safeArea flex={1} bg="#fff">
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
          <HStack space="2"></HStack>
          <HStack space="4" alignItems="center">
            <Pressable
              onPress={() => {
                console.log("user profile clicked");
              }}
            >
              <Avatar bg="indigo.500" alignSelf="center" size="sm">
                N
              </Avatar>
            </Pressable>
          </HStack>
        </HStack>
        <Center flex={1}>
          <Heading
            mt="1"
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
        </Center>
      </Box>
    </>
  );
}
