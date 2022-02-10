import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Stack,
  Text,
  VStack,
  useToast,
  Input,
  FormControl,
  Button,
  Select,
  CheckIcon,
} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { BASE_URL } from "@env";
import { AuthContext } from "../AuthProvider";

import * as SecureStore from "expo-secure-store";

const userSingleURL = `${BASE_URL}/api/user`;

export default function UserProfile({ route, navigation }) {
  const { user, setUser } = useContext(AuthContext);

  /* Get the route param */
  const { userID } = route.params;

  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [validator, setValidator] = useState({});

  // form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .get(`${BASE_URL}/api/user/${userID}/edit`)
      .then((response) => {
        setName(response.data.user.name);
        setPhone(response.data.user.phone);
        setEmail(response.data.user.email);
        setDob(response.data.user.dob);
        setCity(response.data.user.city);
        setGender(response.data.user.gender);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const onProfileUpdateButtonClicked = async () => {
    setLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    const result = await axios
      .put(`${BASE_URL}/api/user/${userID}`, {
        name,
        email,
        phone,
        gender,
        dob,
        city,
      })
      .then((response) => {
        //console.log(response.data.success)
        if (response.data.success === false) {
          const validateMessage = response.data.validator;
          //console.log(validateMessage)
          setValidator(validateMessage);
          console.log("got validation erros", validateMessage);
        } else {
          //console.log('PASSED',response.data.message)
          setValidator({});
          toast.show({
            title: response.data.message,
            placement: "bottom",
            backgroundColor: "green.700",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  return (
    <>
      <Box flex={1} bg="#fff">
        <VStack space="2.5" mt="2">
          <Stack
            space={3}
            ml={10}
            w={{
              base: "80%",
              md: "25%",
            }}
          >
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

            {validator.email ? (
              <FormControl isInvalid>
                <Input
                  onChangeText={setEmail}
                  value={email}
                  size="sm"
                  placeholder="Email"
                  autoCapitalize="none"
                />
                <FormControl.ErrorMessage>
                  {validator.email}
                </FormControl.ErrorMessage>
              </FormControl>
            ) : (
              <Input
                onChangeText={setEmail}
                value={email}
                size="sm"
                placeholder="Email"
                autoCapitalize="none"
              />
            )}

            <Input
              onChangeText={setDob}
              value={dob}
              size="sm"
              placeholder="Date of Birth"
            />

            <Select
              selectedValue={gender}
              minWidth="200"
              accessibilityLabel="Choose Gender"
              placeholder="Choose Gender"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Select.Item label="Male" value="Male" />
              <Select.Item label="Female" value="Female" />
            </Select>

            <Input
              onChangeText={setCity}
              value={city}
              size="sm"
              placeholder="City"
            />

            <Spinner
              //visibility of Overlay Loading Spinner
              visible={loading}
            />

            <Button my={5} onPress={onProfileUpdateButtonClicked}>
              Update Profile
            </Button>

            <Box p={10}></Box>
          </Stack>
        </VStack>
      </Box>
    </>
  );
}
