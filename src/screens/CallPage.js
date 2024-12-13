import {useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react"; // useEffect 추가
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Linking
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 추가


const CallPage = () => {
    
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const handleButtonPress = (number) => {
    setPhoneNumber((prev) => prev + number);
  };

  const clearInput = () => {
    setPhoneNumber((prev) => prev.slice(0, -1)); // 마지막 문자 제거
  };

  const startCall = (number) => {
    if (number.trim() === '') {
      Alert.alert("오류 발생", "전화번호가 입력되지 않았습니다.");
      return;
    }
    const phoneNumber = `tel:${number}`; // 전화 번호
    Linking.openURL(phoneNumber).catch((err) =>
      Alert.alert("오류 발생", "전화 화면을 열 수 없습니다.", [
        { text: "확인" },
      ])
    );
  };




  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        editable={false} // 사용자가 직접 입력할 수 없도록 설정
      />
      <View style={styles.keypad}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("1")}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("2")}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("3")}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("4")}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("5")}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("6")}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("7")}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("8")}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("9")}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("*")}
          >
            <Text style={styles.buttonText}>*</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("0")}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("#")}
          >
            <Text style={styles.buttonText}>#</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => navigation.navigate("MainPage")}
        >
          <Text style={styles.emergencyButtonText}>긴급</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton} onPress={() => startCall(phoneNumber)}>
          <Image
            source={require("../../assets/call.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearInput}>
          <Image
            source={require("../../assets/backspace.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold", // fontWeight 수정을 위한
    textAlign: "center",
  },
  keypad: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: 80, // 키패드 버튼 크기 증가
    height: 80, // 키패드 버튼 크기 증가
    borderRadius: 40, // 동그란 모양 유지
    backgroundColor: "#f0f0f0", // 연한 회색
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  buttonText: {
    color: "#333",
    fontSize: 28, // 글자 크기 증가
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  emergencyButton: {
    backgroundColor: "#ff4d4d",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  emergencyButtonText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "900",
  },
  callButton: {
    backgroundColor: "#28a745",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#EAEAEA", // 회색
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24, // 이미지 크기를 24로 설정
    height: 24, // 이미지 크기를 24로 설정
  },
});

export default CallPage;
