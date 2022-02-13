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
  Heading,
  FlatList,
  Avatar,
  Spacer,
} from "native-base";
import { ImageBackground, Pressable, SafeAreaView } from "react-native";

import Moment from "moment";

import { BASE_URL } from "@env";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../AuthProvider";

export default function Quiz({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Sujitha Mathur",
      timeStamp: "11:11 PM",
      recentText: "Cheer up, there!",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Anci Barroco",
      timeStamp: "6:22 PM",
      recentText: "Good Day!",
    },
  ];

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .get(`${BASE_URL}/api/quiz`)
      .then((response) => {
        //console.log(response.data.quizes);
        setQuizzes(response.data.quizzes);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  if (loading) {
    return (
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
      />
    );
  }

  return (
    <>
      <Box>
        {quizzes.length ? (
          <FlatList
            data={quizzes}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                borderColor="coolGray.200"
                pl="4"
                pr="5"
                py="4"
              >
                <Pressable
                  onPress={() => {
                    navigation.navigate("QuizSingle", {
                      quizID: item.id,
                    });
                  }}
                >
                  <HStack space={3} justifyContent="space-between">
                    <VStack>
                      <Text
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                        fontSize={15}
                      >
                        {item.name}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Text
                      fontSize="15"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      alignSelf="flex-start"
                    >
                      {Moment(item.created_at).format("DD-MM-YYYY")}
                    </Text>
                  </HStack>
                </Pressable>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Heading p={10} textAlign="center">
            No quiz available
          </Heading>
        )}
      </Box>
    </>
  );
}
