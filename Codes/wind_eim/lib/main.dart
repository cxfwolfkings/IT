import 'package:flutter/material.dart';
import 'package:wind_eim/samples/ps_001.dart';
import './ui/button_samples.dart';

// 入口方法，main.dart文件独有
void main() => runApp(MyApp());

// 入口文件，不可修改名称
class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    // 这里使用了MaterialApp脚手架，当然也可以使用WidgetApp，
    // 建议入口使用MaterialApp，直接定义一个容器布局也可以
    return MaterialApp(
      // 标题
      title: 'Wind EIM',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        // 可以自定义配置主题色调
        primarySwatch: Colors.blue,
      ),
      // 页面
      home: MyHomePage(title: 'EIM Home Page'),
    );
  }
}

// 使用StatefulWidget有状态Widget
class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  // 创建State状态
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage>
    with SingleTickerProviderStateMixin {
  List<Widget> _bodies;
  List<TabBar> _tabs;

  // 默认选中第一项
  int _selectedIndex = 0;

  TabController _tabController;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  void initState() {
    super.initState();
    //initialIndex为初始选中第几个，length为数量
    _tabController = TabController(initialIndex: 0, length: 5, vsync: this);
    _tabController.addListener(() {
      switch (_tabController.index) {
        case 0:
          break;
        case 1:
          break;
      }
    });
    _tabs = [
      null,
      TabBar(controller: _tabController, tabs: <Widget>[
        Tab(
          icon: Icon(Icons.directions_bus),
          text: "Tab1",
        ),
        Tab(
          icon: Icon(Icons.directions_railway),
          text: "Tab2",
        ),
        Tab(
          icon: Icon(Icons.directions_boat),
          text: "Tab3",
        ),
        Tab(
          icon: Icon(Icons.directions_car),
          text: "Tab4",
        ),
        Tab(
          icon: Icon(Icons.directions_walk),
          text: "Tab5",
        ),
      ]),
      null
    ];
    _bodies = [
      // Center is a layout widget. It takes a single child and positions it
      // in the middle of the parent.
      Center(child: Text('Index 0: Home')),
      TabBarView(
        controller: _tabController,
        children: <Widget>[
          Center(
            child: Text("TabBarView data1"),
          ),
          Center(
            child: Text("TabBarView data2"),
          ),
          Center(
            child: Text("TabBarView data3"),
          ),
          Center(
            child: Text("TabBarView data4"),
          ),
          Center(
            child: Text("TabBarView data5"),
          ),
        ],
      ),
      Column(
        children: <Widget>[
          Row(
            verticalDirection: VerticalDirection.up,
            textBaseline: TextBaseline.ideographic,
            children: <Widget>[
              RaisedButton(
                color: Colors.blue,
                child: Text(
                  '按钮示例',
                  style: TextStyle(color: Colors.white),
                ),
                onPressed: () {
                  Navigator.of(context)
                      .push(MaterialPageRoute(builder: (BuildContext context) {
                    return ButtonSamples();
                  }));
                },
              ),
              RaisedButton(
                color: Colors.grey,
                child: Text(
                  '   商品展示页  ',
                  style: TextStyle(color: Colors.black),
                ),
                onPressed: () {
                  Navigator.of(context)
                      .push(MaterialPageRoute(builder: (BuildContext context) {
                    return Practice001Sample();
                  }));
                },
              ),
              RaisedButton(
                color: Colors.orange,
                child: Text(
                  '      我是按钮三    ',
                  style: TextStyle(color: Colors.white),
                ),
                onPressed: () {},
              ),
            ],
          ),
          SizedBox(
            height: 10,
          ),
          Row(
            children: <Widget>[
              const FlutterLogo(),
              const Expanded(
                child: Text(
                    'Flutter\'s hot reload helps you quickly and easily experiment, build UIs, add features, and fix bug faster. Experience sub-second reload times, without losing state, on emulators, simulators, and hardware for iOS and Android.'),
              ),
              const Icon(Icons.sentiment_very_satisfied),
            ],
          ),
          SizedBox(
            height: 10,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                " 我们居中显示 |",
                style: TextStyle(color: Colors.teal),
              ),
              Text(" Flutter的Row布局组件 "),
            ],
          ),
        ],
      )
    ];
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    // Scaffold布局脚手架组件
    return Scaffold(
        // 标题栏Widget组件
        appBar: AppBar(
            // Here we take the value from the MyHomePage object that was created by
            // the App.build method, and use it to set our appbar title.
            title: Text(widget.title),
            primary: true,
            bottom: _tabs.elementAt(_selectedIndex)),
        body: _bodies.elementAt(_selectedIndex),
        bottomNavigationBar: BottomNavigationBar(
          items: <BottomNavigationBarItem>[
            BottomNavigationBarItem(
                icon: Icon(Icons.home), title: Text('Home')),
            BottomNavigationBarItem(
                icon: Icon(Icons.business), title: Text('Business')),
            BottomNavigationBarItem(
                icon: Icon(Icons.school), title: Text('测试用例')),
          ],
          currentIndex: _selectedIndex,
          fixedColor: Colors.deepPurple,
          onTap: _onItemTapped,
        ));
  }

  @override
  void dispose() {
    super.dispose();
    _tabController.dispose();
  }
}
