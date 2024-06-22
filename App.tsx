import React from "react";
import SignUpScreen from "./SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./MyStack";

const App=() =>{
  return(
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  )
};

export default App;