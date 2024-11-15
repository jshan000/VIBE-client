import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Stack Navigator 생성
const Stack = createStackNavigator();

// 스플래시 화면 컴포넌트
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // 2초 후에 'Main' 화면으로 이동
    setTimeout(() => {
      navigation.replace('Main'); // 현재 화면을 스택에서 제거하고 'Main' 화면으로 이동
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      <Text style={styles.logoText}>LawReady</Text>
    </View>
  );
};

// 메인 화면 컴포넌트
const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LawReady</Text>
      {/* "문서 작성하기" 버튼 클릭 시 'Category' 화면으로 이동 */}
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate('Category')}
      >
        <Text style={styles.mainButtonText}>문서 작성하기</Text>
      </TouchableOpacity>
    </View>
  );
};

// 카테고리 선택 화면 컴포넌트
const CategoryScreen = () => {
  // 카테고리 목록
  const categories = ['중고 거래 사기', '온라인 욕설', '성희롱/성추행'];

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>먼저, 카테고리를 설정해주세요!</Text>
      {/* 각 카테고리를 버튼으로 렌더링 */}
      {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryButton}>
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// 네비게이션 설정 및 App 컴포넌트 정의
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* 스플래시 화면 */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} // 헤더 숨김
        />
        {/* 메인 화면 */}
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: 'LawReady' }} // 헤더 타이틀 설정
        />
        {/* 카테고리 선택 화면 */}
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{ title: '카테고리 선택' }} // 헤더 타이틀 설정
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // 배경색 설정
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333333', // 로고 텍스트 색상
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20, // 화면 좌우 여백
  },
  title: {
    fontSize: 42, // 메인 화면 타이틀 폰트 크기
    fontWeight: 'bold',
    marginBottom: 20, // 아래 여백
    color: '#333333',
  },
  subtitle: {
    fontSize: 24, // "먼저, 카테고리를 설정해주세요!" 문구의 폰트 크기
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // 텍스트 가운데 정렬
    color: '#333333',
  },
  mainButton: {
    backgroundColor: '#000000', // 버튼 배경색
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8, // 모서리 둥글게
    marginTop: 10,
  },
  mainButtonText: {
    color: '#FFFFFF', // 버튼 텍스트 색상
    fontSize: 18, // 메인 버튼 텍스트 폰트 크기
    fontWeight: 'bold',
  },
  categoryButton: {
    backgroundColor: '#F5F5F5', // 카테고리 버튼 배경색
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5, // 위아래 여백
    width: '100%',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 20, // 카테고리 버튼 텍스트 폰트 크기
    color: '#333333',
  },
});

export default App;


