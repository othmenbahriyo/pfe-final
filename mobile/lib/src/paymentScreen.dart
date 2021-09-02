import 'package:flutter/material.dart';


import 'package:webview_flutter/webview_flutter.dart';

class PaymentScreen extends StatefulWidget {
  PaymentScreen(this.price);
  final int price;


  @override
  _PaymentState createState() => _PaymentState();
}

class _PaymentState extends State<PaymentScreen> {

  String loadHTML() {
    return r'''...''';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: WebView(
        onPageFinished: (page) {
          if(page.contains('/success')) {
            Navigator.pop(context);
          }
        },
        javascriptMode: JavascriptMode.unrestricted,
        initialUrl: "http://172.18.102.225:3000/pay",
      ),
    );
  }

}


