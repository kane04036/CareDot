import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationPage from './src/screens/RegistrationPage'; 
import MainPage from './src/screens/MainPage';
import ChatBotPage from './src/screens/ChatBotPage';
import FireExtinguisherMap from './src/screens/FireExtinguisherMap';
import EmergencyRoomMap from './src/screens/EmergencyRoomMap';
import HomeScreen from './src/screens/HomeScreen';
import EmergencyGuidePage from './src/screens/EmergencyGuidePage';
import CallPage from './src/screens/CallPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CallPage">
        <Stack.Screen name="CallPage" component={CallPage} options={{ headerShown: false, title: '전화' }}/>
        <Stack.Screen name="MainPage" component={MainPage} options={{title: '긴급 홈' }} />
        <Stack.Screen name="RegistrationPage" component={RegistrationPage} options={{ title: '개인 정보 등록' }}/>
        <Stack.Screen name='ChatBotPage' component={ChatBotPage} options={{ title: '챗봇 신고' }}/>
        <Stack.Screen name="FireExtinguisherMap" component={FireExtinguisherMap} options={{ title: '소방서 위치' }}/>
        <Stack.Screen name="EmergencyRoomMap" component={EmergencyRoomMap} options={{ title: '응급실 위치' }}/>
        <Stack.Screen name="EmergencyGuidePage" component={EmergencyGuidePage} options={{ title: '긴급 상황 대처 가이드' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
