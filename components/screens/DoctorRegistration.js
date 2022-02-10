import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Text,
  Center,
  Heading,
  Container,
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
  Image,
} from "native-base";

import { ActivityIndicator } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

import { BASE_URL } from "@env";

const baseURL = `${BASE_URL}/api/doctor`;

//console.log(BASEURL)

export default function DoctorRegistration({ navigation }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [validator, setValidator] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // form states
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nid, setNid] = useState("");
  const [bmdc, setBmdc] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    title,
    name,
    dob,
    gender,
    nid_passport: nid,
    bmdc_number: bmdc,
    phone,
    email,
    password,
    status: 0,
  };

  const onRegisterButtonClicked = async () => {
    setLoading(true);
    const result = await axios
      .post(`${BASE_URL}/api/doctor`, data)
      .then((response) => {
        //console.log(response.data.success)
        if (response.data.success === false) {
          const validateMessage = response.data.validator;
          //console.log(validateMessage)
          setValidator(validateMessage);
          console.log("got validation erros", validator);
        } else {
          //console.log('PASSED',response.data.message)
          setValidator({});
          toast.show({
            title: response.data.message,
            placement: "bottom",
            backgroundColor: "green.700",
          });

          // Redirect to login screen
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.log("error on doctor registration axios post request", error);
      });
    setLoading(false);
  };

  return (
    <>
      <Box flex={1} bg="#fff">
        <ScrollView showsVerticalScrollIndicator={true}>
          <VStack space="2.5" mt="8">
            <Stack
              space={3}
              ml={10}
              w={{
                base: "80%",
                md: "25%",
              }}
            >
              {validator.title ? (
                <FormControl isInvalid>
                  <Select
                    selectedValue={title}
                    minWidth="200"
                    accessibilityLabel="Choose Title"
                    placeholder="Choose Title"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setTitle(itemValue)}
                  >
                    <Select.Item label="Dr." value="Dr." />
                    <Select.Item label="Prof. Dr." value="Prof. Dr." />
                    <Select.Item
                      label="Assoc. Prof. Dr."
                      value="Assoc. Prof. Dr."
                    />
                    <Select.Item
                      label="Asst. Prof. Dr."
                      value="Asst. Prof. Dr."
                    />
                  </Select>
                  <FormControl.ErrorMessage>
                    {validator.title}
                  </FormControl.ErrorMessage>
                </FormControl>
              ) : (
                <Select
                  selectedValue={title}
                  minWidth="200"
                  accessibilityLabel="Choose Title"
                  placeholder="Choose Title"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setTitle(itemValue)}
                >
                  <Select.Item label="Dr." value="Dr." />
                  <Select.Item label="Prof. Dr." value="Prof. Dr." />
                  <Select.Item
                    label="Assoc. Prof. Dr."
                    value="Assoc. Prof. Dr."
                  />
                  <Select.Item
                    label="Asst. Prof. Dr."
                    value="Asst. Prof. Dr."
                  />
                  <Select.Item label="Backend Development" value="backend" />
                </Select>
              )}

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

              {validator.dob ? (
                <FormControl isInvalid>
                  <Input
                    onChangeText={setDob}
                    value={dob}
                    size="sm"
                    placeholder="Date of Birth"
                  />
                  <FormControl.ErrorMessage>
                    {validator.dob}
                  </FormControl.ErrorMessage>
                </FormControl>
              ) : (
                <Input
                  onChangeText={setDob}
                  value={dob}
                  size="sm"
                  placeholder="Date of Birth"
                />
              )}

              {validator.gender ? (
                <FormControl isInvalid>
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
                  <FormControl.ErrorMessage>
                    {validator.gender}
                  </FormControl.ErrorMessage>
                </FormControl>
              ) : (
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
              )}

              {validator.nid_passport ? (
                <FormControl isInvalid>
                  <Input
                    onChangeText={setNid}
                    value={nid}
                    size="sm"
                    placeholder="NID/Passport Number"
                  />
                  <FormControl.ErrorMessage>
                    {validator.nid_passport}
                  </FormControl.ErrorMessage>
                </FormControl>
              ) : (
                <Input
                  onChangeText={setNid}
                  value={nid}
                  size="sm"
                  placeholder="NID/Passport Number"
                />
              )}

              {validator.bmdc_number ? (
                <FormControl isInvalid>
                  <Input
                    onChangeText={setBmdc}
                    value={bmdc}
                    size="sm"
                    placeholder="Registration Number (BMDC)"
                  />
                  <FormControl.ErrorMessage>
                    {validator.bmdc_number}
                  </FormControl.ErrorMessage>
                </FormControl>
              ) : (
                <Input
                  onChangeText={setBmdc}
                  value={bmdc}
                  size="sm"
                  placeholder="BMDC Numer"
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
                Register
              </Button>

              <Box p={10}></Box>
            </Stack>
          </VStack>
        </ScrollView>
      </Box>
    </>
  );
}
