import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import axios from "axios";
import uuid from "uuid-random";
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 가져오기

// 챗봇 UI 및 제미나이 API 연결
const ChatBotPage = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "저는 긴급 신고 매니저 지니입니다. 무엇을 도와드릴까요?",
      responses: []
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const id = uuid();

  // 제미나이 API 요청 함수
  const sendMessage = async () => {
    if (!input.trim()) return; // 공백 입력 방지
    setInput(""); // 입력 필드 초기화

    const newMessages = [
      ...messages,
      { role: "user", content: input, responses: [] },
    ];
    setMessages(newMessages);
    setIsLoading(true); // 로딩 상태 시작

    try {
      const url = "https://care-dot-gxeey.run.goorm.site/chat/report/";
      const parameter = {
        id: id,
        content: input,
      };
      const response = await axios.post(url, parameter);
      const data = response.data;
      console.log(data);
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.text, responses: data.responses },
      ]);
    } catch (error) {
      console.error("network error:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, there was an error." },
      ]);
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  const handleEmergencyGuide = (title, content) => {
    navigation.navigate('EmergencyGuidePage', { title: title, content: content }); 
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // 키보드가 올라올 때의 오프셋 조정
    >
      <ScrollView
        style={styles.chatContainer}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 20 }} // 스크롤뷰의 아래 여백 추가
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            style={
              msg.role === "user" ? styles.userMessage : styles.assistantMessage
            }
          >
            {msg.role === "assistant" && (
              <Image
                source={require("../../assets/chatbot-icon.png")}
                style={styles.botIcon}
              />
            )}
            <Text
              style={
                msg.role === "user" ? styles.userText : styles.assistantText
              }
            >
              {msg.content}
            </Text>

            {/* responses가 있을 경우 버튼 추가 */}
            {msg.responses &&
              msg.responses.length > 0 &&
              msg.responses.map((response, responseIndex) => (
                <TouchableOpacity
                  onPress={() => handleEmergencyGuide(response.title, response.content)} 
                  key={responseIndex}
                  style={styles.responseButton}
                >
                  <Text style={styles.responseButtonText}>
                    {response.title}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        ))}
        {isLoading && <Text style={styles.loadingText}>작성중...</Text>}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="현재 상황을 설명해주세요"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage} // 엔터 키로 전송
          returnKeyType="send" // 키보드의 엔터 키를 "전송"으로 변경
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E6E6E6",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userText: {
    fontSize: 16,
    fontWeight: "400",
  },
  assistantText: {
    fontSize: 16,
    fontWeight: "300",
  },
  loadingText: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#999",
  },
  botIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#0062ff",
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  responseButton: {
    backgroundColor: '#0062ff',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  responseButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ChatBotPage;
