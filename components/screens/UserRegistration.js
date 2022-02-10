import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Text,
  Center,
  Heading,
  Container,
  Image,
  Input,
  Stack,
  Icon,
  VStack,
  HStack,
  Select,
  CheckIcon,
  Button,
  ScrollView,
  FormControl,
  useToast,
  Badge,
} from "native-base";

import { ActivityIndicator, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

import { BASE_URL } from "@env";

//console.log(BASEURL)

export default function UserRegistration({ navigation }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    name,
    phone,
    password,
    device_name: "mobile",
  };

  const onRegisterButtonClicked = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/api/user-register`, data)
      .then((response) => {
        //console.log(response.data.success)
        if (response.data.success === false) {
          const validateMessage = response.data.validator;
          //console.log(validateMessage)
          setValidator(validateMessage);
          console.log("got validation erros", validateMessage);
          setLoading(false);
        } else {
          //console.log('PASSED',response.data.message)
          setValidator({});
          setTimeout(function () {
            toast.show({
              title: response.data.message,
              placement: "bottom",
              backgroundColor: "green.700",
            });
          }, 3000);

          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box flex={1} bg="#fff">
      <Box alignItems="center">
        <Image
          source={{
            uri: "https://i.imgur.com/J7BM7hJ.png",
          }}
          alt="logo"
          size="xl"
          style={{ resizeMode: "contain" }}
        />
      </Box>
      <VStack space="2.5" mt="2">
        <Stack
          space={3}
          ml={10}
          w={{
            base: "80%",
            md: "25%",
          }}
        >
          <Text fontSize="lg" mb={2}>
            New User Registration
          </Text>
          {validator.name ? (
            <FormControl isInvalid>
              <Input
                onChangeText={setName}
                value={name}
                size="sm"
                placeholder="Full Name"
              />
              <FormControl.ErrorMessage>
                {validator.name}
              </FormControl.ErrorMessage>
            </FormControl>
          ) : (
            <Input
              onChangeText={setName}
              value={name}
              size="sm"
              placeholder="Full Name"
            />
          )}

          {validator.phone ? (
            <FormControl isInvalid>
              <Input
                onChangeText={setPhone}
                value={phone}
                size="sm"
                placeholder="Phone"
              />
              <FormControl.ErrorMessage>
                {validator.phone}
              </FormControl.ErrorMessage>
            </FormControl>
          ) : (
            <Input
              onChangeText={setPhone}
              value={phone}
              size="sm"
              placeholder="Phone"
            />
          )}

          {validator.password ? (
            <FormControl isInvalid>
              <Input
                onChangeText={setPassword}
                value={password}
                type={showPassword ? "text" : "password"}
                size="sm"
                InputRightElement={
                  <Button
                    size="sm"
                    rounded="none"
                    w="1/6"
                    h="full"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                }
                placeholder="Password"
              />
              <FormControl.ErrorMessage>
                {validator.password}
              </FormControl.ErrorMessage>
            </FormControl>
          ) : (
            <Input
              onChangeText={setPassword}
              value={password}
              type={showPassword ? "text" : "password"}
              size="sm"
              InputRightElement={
                <Button
                  size="sm"
                  rounded="none"
                  w="1/6"
                  h="full"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              }
              placeholder="Password"
            />
          )}

          <Spinner
            //visibility of Overlay Loading Spinner
            visible={loading}
          />

          <Button
            style={{ borderRadius: 50 }}
            _text={{ fontSize: "xl" }}
            my={5}
            onPress={onRegisterButtonClicked}
          >
            SIGN UP
          </Button>
        </Stack>
      </VStack>
    </Box>
  );
}
