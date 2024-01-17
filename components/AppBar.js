import * as React from "react";
import { Header } from "@rneui/base";
import { Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default function AppBar(props) {
  return (
    <Header
      backgroundColor="#000000"
      barStyle="default"
      centerComponent={
        <Text style={styles.ez} >
          {props.ez}
        </Text>
      }
      centerContainerStyle={{ padding: 5 }}
      containerStyle={{ borderBottomWidth: 0 }}
      placement="center"
    />
  );
}

const styles = StyleSheet.create({
  ez: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: RFValue(24.5),
    color:'#FC4949'
  },
  split: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: RFValue(24.5),
    color:'#D3D3D3'
  }
});