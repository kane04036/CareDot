import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Linking,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const MainPage = () => {
  const [name, setName] = useState("");
  const navigation = useNavigation();

  // 컴포넌트가 처음 렌더링될 때 name 데이터를 로드합니다.
  useEffect(() => {
    fetchName();
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchName = async () => {
    try {
      const storedName = await AsyncStorage.getItem("name");
      if (storedName) {
        setName(storedName);
      } 
    } catch (error) {
      console.error("Error fetching name from AsyncStorage", error);
    }
  };

  const handleEmergencyCall = () => {
    const phoneNumber = "tel:119"; // 전화 번호
    Linking.openURL(phoneNumber).catch((err) =>
      Alert.alert("오류 발생", "전화 화면을 열 수 없습니다.", [
        { text: "확인" },
      ])
    );
  };

  const handleChatBotEmergencyCall = () => {
    navigation.navigate("ChatBotPage"); 
  };
  const handleRegister = () => {
    navigation.navigate("RegistrationPage"); 
  };

  const handleEdit = () => {
    navigation.navigate("RegistrationPage"); 
  };

  const handleFireExtinguisherMap = () => {
    navigation.navigate("FireExtinguisherMap"); 
  };

  const handleEmergencyRoomMap = () => {
    navigation.navigate("EmergencyRoomMap"); 
  };
  return (
    <ScrollView style={styles.screen}>
      <RefreshControl refreshing={isRefreshing} onRefresh={fetchName} />

      <View style={styles.container}>
        {name ? (
          <View style={styles.infoContainer}>
            <Image
              source={require("../../assets/profile.png")}
              style={styles.profileImage}
            />
            <Text style={styles.text}>{name}</Text>

            <TouchableOpacity onPress={handleEdit}>
              <Text style={styles.editButton}>수정</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoContainer}>
          <Image
            source={require("../../assets/profile.png")}
            style={styles.profileImage}
          />
          <Text style={styles.text}>정보가 없습니다</Text>

          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.editButton}>등록</Text>
          </TouchableOpacity>
        </View>
        )}

        <View style={styles.horizontalContainer}>
          <TouchableOpacity style={styles.fireExtinguisher} onPress={handleFireExtinguisherMap}>
          <Image style={styles.icon} source={require("../../assets/fire_station.png")}></Image>

            <Text style={styles.fireExtinguisherText}>소방서 위치</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emergencyRoom} onPress={handleEmergencyRoomMap}>
          <Image style={styles.icon} source={require("../../assets/hospital.png")}></Image>

            <Text style={styles.emergencyRoomText}>응급실 위치</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalContainer}>
          <TouchableOpacity style={styles.emergency} onPress={handleEmergencyCall}>
            <Image style={styles.icon} source={require("../../assets/report.png")}></Image>
            <Text style={styles.emergencyText}>긴급신고</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emergencyChatBot} onPress={handleChatBotEmergencyCall}>
          <Image style={styles.icon} source={require("../../assets/chat.png")}></Image>
            <Text style={styles.emergencyChatBotText}>챗봇신고</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const buttonHeight = 250;
const fontSize = 30;
const fontWeight = 900;
const iconSize = 70

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    alignItems: "center", // 세로 정렬
    justifyContent: "center", // 가로 정렬
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: "row", // 가로 배치
    alignItems: "center", // 세로 정렬
    justifyContent: "center",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row", // 가로 배치
    alignItems: "center", // 세로 정렬
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    padding: 13,
    borderRadius: 30,
    margin: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: 900,
    flex: 1,
    textAlign: "center", // 텍스트 가로 정렬
  },
  profileImage: {
    width: 30,
    height: 30,
  },
  editButton: {
    fontSize: 14,
    fontWeight: 400,
    padding: 10,
    color: "#ffffff",
    backgroundColor: "#0062ff",
    borderRadius: 20,
  },
  emergencyText: {
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: "#ffffff",
  },
  emergency: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center", 
    height: buttonHeight,
    width: '45%',
    margin: 5,
  },
  emergencyChatBotText: {
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: "#ffffff",
  },
  emergencyChatBot: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center", 
    height: buttonHeight,
    width: '45%',
    margin: 5,

  },
  emergencyRoomText: {
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: "#ffffff",
  },
  emergencyRoom: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center", 
    height: buttonHeight,
    width: '45%',
    margin: 5,

  },
  fireExtinguisherText: {
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: "#ffffff",
  },
  fireExtinguisher: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center", 
    height: buttonHeight,
    width: '45%',
    margin: 5,

  },
  icon: {
    width: iconSize,
    height: iconSize,    

  }
});

export default MainPage;

