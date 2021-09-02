import 'dart:convert';
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;


class Taj extends StatefulWidget {
  @override
  _Taj createState() => _Taj();
}

class _Taj extends State<Taj> {
  var data;
  var usersData;
  getUser() async {
    http.Response response = await http.get( Uri.encodeFull("http://172.18.102.225:3000/api/list/res"));
    
    data  = json.decode(response.body);
    
    setState(() {

        
    });
  }

  @override
  void initState() {
    super.initState();
    getUser();
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("list user"),
      ),
      body: ListView.builder(
      itemCount: data == null ? 0 : data.length,
      itemBuilder: (BuildContext context, int i) {
        return Card(
          child: Row(
            children: <Widget>[
              Text("data[1]")
            ],
          ),
        );
      },
      
      )

    );
  }

  
}
