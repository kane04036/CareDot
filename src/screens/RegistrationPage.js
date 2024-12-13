import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage 추가

const RegistrationPage = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    name: '',
    gender: '',
    age: '',
    bloodType: '',
    phone: '',
    address: '',
    detailedAddress: '',
    illnesses: '',
    medications: '',
    emergencyContact: '',
  });

  // 컴포넌트가 마운트될 때 로컬 데이터 불러오기
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.multiGet([
          'name',
          'gender',
          'age',
          'bloodType',
          'phone',
          'address',
          'detailedAddress',
          'illnesses',
          'medications',
          'emergencyContact',
        ]);
        const loadedForm = {};
        savedData.forEach(([key, value]) => {
          loadedForm[key] = value || ''; // 값이 없으면 빈 문자열로 설정
        });
        setForm(loadedForm);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      for (const [key, value] of Object.entries(form)) {
        await AsyncStorage.setItem(key, value);
      }
      console.log('Saved Data:', form);
      Alert.alert('등록 완료', '입력한 정보가 성공적으로 등록되었습니다.');
      handleBackPress(); 
    } catch (error) {
      Alert.alert('오류 발생', '데이터를 저장하는 중 오류가 발생했습니다.');
      console.error('Storage Error:', error);
    }
  };

  // 필수 항목을 모두 입력했는지 확인
  const isFormValid = () => {
    const requiredFields = [
      'name',
      'gender',
      'age',
      'bloodType',
      'phone',
      'address',
      'detailedAddress',
      'emergencyContact',
    ];
    return requiredFields.every((field) => form[field].trim() !== '');
  };

  const handleBackPress = () => {
    navigation.goBack(); // 네비게이션 작동하도록 수정
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.avoid}
      >
        <ScrollView>
          <Text style={styles.title}>개인 정보를 입력해주세요.</Text>
          <Text style={styles.subTitle}>긴급상황시 구조 및 도움을 위해 사용됩니다.</Text>

          <TextInput
            style={styles.input}
            placeholder="성명(필수)"
            onChangeText={(text) => handleChange('name', text)}
            value={form.name}
          />
          <TextInput
            style={styles.input}
            placeholder="성별(필수)"
            onChangeText={(text) => handleChange('gender', text)}
            value={form.gender}
          />
          <TextInput
            style={styles.input}
            placeholder="나이(필수)"
            keyboardType="numeric"
            onChangeText={(text) => handleChange('age', text)}
            value={form.age}
          />
          <TextInput
            style={styles.input}
            placeholder="혈액형(필수)"
            onChangeText={(text) => handleChange('bloodType', text)}
            value={form.bloodType}
          />
          <TextInput
            style={styles.input}
            placeholder="전화번호(필수)"
            keyboardType="phone-pad"
            onChangeText={(text) => handleChange('phone', text)}
            value={form.phone}
          />
          <TextInput
            style={styles.input}
            placeholder="주소(필수)"
            onChangeText={(text) => handleChange('address', text)}
            value={form.address}
          />
          <TextInput
            style={styles.input}
            placeholder="상세주소(필수)"
            onChangeText={(text) => handleChange('detailedAddress', text)}
            value={form.detailedAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="앓고 있는 지병(선택)"
            onChangeText={(text) => handleChange('illnesses', text)}
            value={form.illnesses}
          />
          <TextInput
            style={styles.input}
            placeholder="복용 중인 약(선택)"
            onChangeText={(text) => handleChange('medications', text)}
            value={form.medications}
          />
          <TextInput
            style={styles.input}
            placeholder="긴급 연락망(필수)"
            keyboardType="phone-pad"
            onChangeText={(text) => handleChange('emergencyContact', text)}
            value={form.emergencyContact}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isFormValid() ? '#4CAF50' : '#d0e6d8' }, // 활성화 시 진한 초록색, 비활성화 시 연한 초록색
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid()} // 모든 필수 입력 필드가 채워져야 버튼 활성화
            >
              <Text style={{ color: isFormValid() ? '#FFFFFF' : '#A9A9A9', fontSize: 16 }}>
                등록하기
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    marginLeft: 12,
    marginRight: 12,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    marginLeft: 12,
    marginTop: 10,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 50,
    marginLeft: 12,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
});

export default RegistrationPage;
