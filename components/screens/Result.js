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
  Badge,
  Icon,
} from "native-base";
import {
  Alert,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

import Spinner from "react-native-loading-spinner-overlay";

import { BASE_URL } from "@env";
import { AuthContext } from "../AuthProvider";

export default function Result({ quizID, score }) {
  const { user, setUser, login, logout } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [totalScore, setTotalScore] = useState(null);
  const [quizInfo, setQuizInfo] = useState({});

  useEffect(() => {
    //axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .post(`${BASE_URL}/api/result/add-result`, {
        quiz_id: quizID,
        user_id: user.userObj.id,
        score: score,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        //alert(err.response);
        console.log("Failed! could not added result data");
      });
  }, []);

  useEffect(() => {
    //axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .get(
        `${BASE_URL}/api/result?quiz_id=${quizID}&user_id=${user.userObj.id}`
      )
      .then((response) => {
        //console.log(response.data);
        setResult(response.data.questions);
        setTotalScore(response.data.total_score);
        setQuizInfo(response.data.quiz_info);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Could not get result from this quiz", quizID);
      });
  }, [totalScore]);

  if (loading) {
    return (
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        textContent="Getting result"
      />
    );
  }

  return (
    <>
      <Box>
        <Heading fontSize="lg" textAlign={"center"}>
          You scored {totalScore} out of {result.length}
        </Heading>
        {totalScore < quizInfo.passing_score ? (
          <Heading
            fontSize="lg"
            py="2"
            color="red.500"
            letterSpacing={3}
            textAlign={"center"}
          >
            FAILED
          </Heading>
        ) : (
          <Heading
            fontSize="lg"
            py="2"
            color="green.500"
            letterSpacing={3}
            textAlign={"center"}
          >
            PASSED
          </Heading>
        )}
        <FlatList
          data={result}
          renderItem={({ item, index }) => (
            <Box borderBottomWidth="1" borderColor="coolGray.200" my="3">
              <HStack space={3} justifyContent="space-between">
                <VStack>
                  <Text color="coolGray.800" bold fontSize="md">
                    {index + 1}. {item.question}
                  </Text>

                  {result[index].options.map((option, i) => (
                    <Badge
                      key={i}
                      colorScheme={
                        result[index].correct === option ? "success" : "danger"
                      }
                      rounded="md"
                    >
                      {result[index].correct === option ? (
                        <Text fontSize="md">
                          {option}
                          {"   "}
                          {result[index].selected_option === option ? (
                            <Icon
                              as={Ionicons}
                              name="checkmark-outline"
                              size="5"
                            />
                          ) : (
                            ""
                          )}
                        </Text>
                      ) : (
                        <Text fontSize="md">
                          {option}
                          {"   "}
                          {result[index].selected_option === option ? (
                            <Icon as={Ionicons} name="close-outline" size="5" />
                          ) : (
                            ""
                          )}
                        </Text>
                      )}
                    </Badge>
                  ))}
                </VStack>
                <Spacer />
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </>
  );
}
