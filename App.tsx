import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, Vibration, Alert } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import axios from 'axios';
import HapticFeedback from 'react-native-haptic-feedback';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const audioRecorderPlayer = new AudioRecorderPlayer();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Recording" component={RecordingScreen} options={{ title: '소리 분석' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// 1. 로고 페이지 (Splash Screen)
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main');  // 로딩 후 메인 화면으로 이동
    }, 2000);  // 2초 로딩 시간

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VIBE</Text>
    </View>
  );
};

// 2. 메인 페이지
const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>VIBE</Text>
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Recording')}>
        <Text style={styles.startButtonText}>외출 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

// 3. 녹음 및 데시벨 시각화 페이지
const RecordingScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [decibelLevel, setDecibelLevel] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const onStartRecord = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      Alert.alert("Permission Required", "마이크 권한이 필요합니다. 설정에서 권한을 허용해 주세요.");
      return;
    }

    setIsRecording(true);
    setAlertMessage(null);  // 초기화
    await audioRecorderPlayer.startRecorder();

    audioRecorderPlayer.addRecordBackListener((e) => {
      const currentDecibel = e.currentMetering || 0;
      setDecibelLevel(currentDecibel);

      // 백엔드에 오디오 데이터를 전송하고 분석 요청
      sendDecibelToBackend(currentDecibel);
      return;
    });
  };

  const onStopRecord = async () => {
    setIsRecording(false);
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
  };

  const sendDecibelToBackend = async (decibel: number) => {
    try {
      const response = await axios.post('http://<server-ip>:5000/analyze-audio', { decibel });
      const { alert, message } = response.data;
      if (alert) {
        setAlertMessage(message);
        HapticFeedback.trigger("notificationWarning");
        Vibration.vibrate(500);  // 진동 0.5초
      } else {
        setAlertMessage(null);  // 경고 해제
      }
    } catch (error) {
      console.error('Error in analysis:', error);
    }
  };

  // 데시벨 상태에 따른 배경 색상 설정
  const getBackgroundColor = () => {
    if (decibelLevel < 50) {
      return '#00FF00'; // 안전 (초록)
    } else if (decibelLevel >= 50 && decibelLevel < 80) {
      return '#FFFF00'; // 경고 (노랑)
    } else {
      return '#FF0000'; // 위험 (빨강)
    }
  };

  // 데시벨 상태에 따른 메시지 설정
  const getStatusMessage = () => {
    if (decibelLevel < 50) {
      return '안전한 주변 소음입니다';
    } else if (decibelLevel >= 50 && decibelLevel < 80) {
      return '주의! 주변에 경고음이 들립니다';
    } else {
      return '위험한 소음이 감지되었습니다! 주의하세요!';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <TouchableOpacity style={styles.micButton} onPress={isRecording ? onStopRecord : onStartRecord}>
        <Text style={styles.micIcon}>{isRecording ? '🛑' : '🎧'}</Text>
      </TouchableOpacity>
      <Text style={styles.decibelText}>현재 데시벨: {decibelLevel} dB</Text>
      <Text style={styles.statusMessage}>{getStatusMessage()}</Text>
      {alertMessage && <Text style={styles.alert}>{alertMessage}</Text>}
    </View>
  );
};

// 마이크 권한 요청 함수
async function requestMicrophonePermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'This app needs access to your microphone for sound analysis.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 52,
    fontWeight: 'bold',
  },
  startButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  micButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  micIcon: {
    fontSize: 40,
  },
  decibelText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  statusMessage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alert: {
    marginTop: 20,
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default App;
