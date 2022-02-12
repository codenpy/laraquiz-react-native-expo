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

export default function UserResults({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .get(`${BASE_URL}/api/user-results/${user.userObj.id}`)
      .then((response) => {
        //console.log(response.data.quizes);
        setQuizes(response.data.quizes);
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
        {quizes.length ? (
          <FlatList
            data={quizes}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
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
