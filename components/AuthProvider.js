import React, { useState } from "react";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { BASE_URL } from "@env";
import { Toast } from "native-base";

export const AuthContext = React.createContext({ user: "", setUser: () => {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        login: (phone, password) => {
          axios
            .post(`${BASE_URL}/api/login`, {
              phone,
              password,
              device_name: "mobile",
            })
            .then((response) => {
              if (response.data.success === false) {
                Alert.alert(response.data.message);
                console.log(
                  "error! login validation failed",
                  response.data.message
                );
              } else {
                const userResponse = {
                  userObj: response.data.user,
                  token: response.data.userToken,
                };
                setUser(userResponse);
                SecureStore.setItemAsync(
                  "userToken",
                  JSON.stringify(userResponse)
                );
                setError(null);
                Toast.show({
                  title: response.data.message,
                  placement: "bottom",
                  backgroundColor: "green.700",
                });
              }
            })
            .catch((error) => {
              console.log("error AuthProvider login");
              const key = Object.keys(error.response.data.errors)[0];
              setError(error.response.data.errors[key][0]);
            });
        },
        logout: () => {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${user.token}`;
          axios
            .post("/api/logout")
            .then((response) => {
              setUser(null);
              SecureStore.deleteItemAsync("userToken");
            })
            .catch((error) => {
              console.log(error.response);
            });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
