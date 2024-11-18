import 'package:flutter/material.dart';
import 'dart:async';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'LawReady',
      theme: ThemeData(
        primarySwatch: Colors.indigo,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: SplashScreen(),
    );
  }
}

// Splash Screen that displays the logo for 2 seconds
class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Timer(Duration(seconds: 2), () {
      Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (context) => MainScreen()));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Text(
          'LawReady',
          style: TextStyle(
            fontSize: 40,
            fontWeight: FontWeight.bold,
            color: Colors.indigo,
          ),
        ),
      ),
    );
  }
}

// Main Screen with "문서 작성하러가기" button
class MainScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'LawReady',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 36,
                fontWeight: FontWeight.bold,
                color: Colors.indigo,
              ),
            ),
            SizedBox(height: 30),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.indigo,
                padding: EdgeInsets.symmetric(vertical: 15),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => CategorySelectionScreen()));
              },
              child: Text(
                '문서 작성하러가기',
                style: TextStyle(fontSize: 20, color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Category Selection Screen
class CategorySelectionScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.indigo),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      backgroundColor: Colors.white,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '먼저, 카테고리를 설정해주세요!',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.indigo,
              ),
            ),
            SizedBox(height: 20),
            Expanded(
              child: ListView(
                children: [
                  _buildCategoryTile(context, '중고거래 사기'),
                  _buildCategoryTile(context, '온라인 욕설'),
                  _buildCategoryTile(context, '성희롱/성추행'),
                  _buildCategoryTile(context, '폭행/상해'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryTile(BuildContext context, String title) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      margin: EdgeInsets.symmetric(vertical: 10),
      elevation: 2,
      child: ListTile(
        title: Text(
          title,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w500,
            color: Colors.indigo,
          ),
        ),
        trailing: Icon(Icons.arrow_forward_ios, color: Colors.indigo),
        onTap: () {
          Navigator.of(context).push(
              MaterialPageRoute(builder: (context) => DocumentForm(title)));
        },
      ),
    );
  }
}

// Document Form Screen
class DocumentForm extends StatelessWidget {
  final String category;

  DocumentForm(this.category);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.indigo),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          '$category 문서 작성',
          style: TextStyle(color: Colors.indigo),
        ),
      ),
      backgroundColor: Colors.white,
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: _getFormFields(category),
        ),
      ),
    );
  }

  // Return form fields based on category
  List<Widget> _getFormFields(String category) {
    switch (category) {
      case '중고거래 사기':
        return [
          _buildTextField('거래하신 물품의 이름과 종류는 무엇인가요?'),
          _buildTextField('거래를 진행한 날짜와 방식을 알려주세요.'),
          _buildTextField('피해 금액은 얼마인가요?'),
          _buildTextField('어떤 문제가 발생했는지 구체적으로 설명해주세요.'),
          _buildTextField('상대방의 이름, 연락처, 또는 계좌 정보가 있나요? (선택)'),
          _buildTextField('거래 내역을 증명할 자료(채팅, 계좌 내역)가 있으신가요? (선택)'),
        ];
      case '온라인 욕설':
        return [
          _buildTextField('욕설이나 모욕이 발생한 플랫폼을 알려주세요.'),
          _buildTextField('언제 욕설이 발생했나요? (날짜와 시간)'),
          _buildTextField('어떤 욕설이나 모욕적인 발언을 들으셨나요?'),
          _buildTextField('상대방의 아이디나 실명을 알고 계신가요? (선택)'),
          _buildTextField('관련 내용을 캡처한 자료가 있으신가요? (선택)'),
        ];
      case '성희롱/성추행':
        return [
          _buildTextField('사건이 발생한 날짜와 장소는 어디인가요?'),
          _buildTextField('어떤 언어나 행동으로 성희롱·성추행을 당하셨나요?'),
          _buildTextField('가해자의 이름 또는 직위는 무엇인가요?'),
          _buildTextField('본인은 사건 당시 어떤 반응을 보이셨나요? (선택)'),
          _buildTextField('사건을 입증할 증거가 있으신가요? (선택)'),
        ];
      case '폭행/상해':
        return [
          _buildTextField('폭행이 발생한 날짜와 장소는 어디인가요?'),
          _buildTextField('어떤 방식으로 폭행이 이루어졌나요?'),
          _buildTextField('가해자의 신원이나 특징을 알고 계신가요?'),
          _buildTextField('신체적 피해는 어느 정도인가요?'),
          _buildTextField('폭행 당시 목격자가 있었나요? (선택)'),
        ];
      default:
        return [];
    }
  }

  // Helper to build a text field
  Widget _buildTextField(String question) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      child: TextField(
        decoration: InputDecoration(
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(10.0)),
          labelText: question,
          labelStyle: TextStyle(color: Colors.indigo),
        ),
      ),
    );
  }
}

