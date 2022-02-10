import React, { useState, useEffect, useContext } from "react";
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
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { BASE_URL } from "@env";
import { AuthContext } from "../AuthProvider";

export default function DoctorProfile({ route, navigation }) {
  const { user, setUser } = useContext(AuthContext);

  /* Get the route param */
  const { doctorID } = route.params;

  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [validator, setValidator] = useState({});

  // form states
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nid, setNid] = useState("");
  const [bmdc, setBmdc] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, SetQualification] = useState("");
  const [avatar, setAvatar] = useState("");
  const [consultation_fee, setConsultation_fee] = useState("");
  const [total_experience, setTotal_experience] = useState("");
  const [working_in, setWorking_in] = useState("");
  const [availability, setAvailability] = useState("");
  const [consultation_time, setConsultation_time] = useState("");
  const [about_doctor, setAbout_doctor] = useState("");

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .get(`${BASE_URL}/api/doctor/${doctorID}/edit`)
      .then((response) => {
        setTitle(response.data.doctor.title);
        setName(response.data.doctor.name);
        setPhone(response.data.doctor.phone);
        setEmail(response.data.doctor.email);
        setDob(response.data.doctor.dob);
        setNid(response.data.doctor.nid_passport);
        setGender(response.data.doctor.gender);
        setBmdc(response.data.doctor.bmdc_number);
        setConsultation_time(response.data.doctor.consultation_time);
        setAbout_doctor(response.data.doctor.about_doctor);
        setAvailability(response.data.doctor.availability);
        setWorking_in(response.data.doctor.working_in);
        setTotal_experience(response.data.doctor.total_experience);
        setConsultation_fee(response.data.doctor.consultation_fee);
        SetQualification(response.data.doctor.qualification);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  return (
    <>
      <Box safeArea flex={1} bg="#fff">
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
              <Spinner
                //visibility of Overlay Loading Spinner
                visible={loading}
              />

              <Button
                style={{ borderRadius: 50 }}
                _text={{ fontSize: "xl" }}
                my={5}
                //onPress={onRegisterButtonClicked}
              >
                Update Profile
              </Button>

              <Box p={10}></Box>
            </Stack>
          </VStack>
        </ScrollView>
      </Box>
    </>
  );
}
