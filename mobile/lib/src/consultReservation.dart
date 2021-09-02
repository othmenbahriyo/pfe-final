import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:flutter/material.dart';
import 'package:pfe_1/src/Widget/bezierContainer.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:pfe_1/src/drawer.dart';
import 'package:pfe_1/src/paymentScreen.dart';
import 'package:pfe_1/src/reservation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;



class Consult extends StatefulWidget {
  String dateE = "";
  String location = "";
  String dateS = "";
  String matricule = "";
  String tPark = "";
  String timeE = "";
  String timeS = "";

  Consult();

  @override
  _Consult createState() => _Consult();
}

class _Consult extends State<Consult> {
  String dateE = "";
  String location = "";
  String dateS = "";
  String matricule = "";
  String tPark = "";
  String timeE = "";
  String timeS = "";
  String _id = "";

  _Consult();

  @override
  void initState() {
    super.initState();
    getMatricule().then((String name) {
      getReservation();
      setState(() {
        matricule = name;
      });
    });
  }
  


 
  List data;
  List dataNow;
  var usersData;
  SharedPreferences prefs;
  Future<String> getMatricule() async {
    prefs = await SharedPreferences.getInstance();
    String name = prefs.getString("name");
    return name;
  }

  Future<bool> deleteReservation(String _id) async {
    return http
        .delete("http://172.18.102.225:3000/api/list/d" + "/${_id}")
        .then((data) {
      print("delete");

      return true;
    });
  }

  getReservation() async {
    http.Response response =
        await http.get("http://172.18.102.225:3000/api/list/res");

    data = json.decode(response.body);
    print(data.length);
    for (int i = 0; i < data.length; i++) {
      if (data[i]["matricule"] == matricule) {
        print(location);
        setState(() {
          dateE = data[i]["dateE"];
          location = data[i]["name"];
          dateS = data[i]["dateS"];
          tPark = data[i]["Tpark"];
          timeE = data[i]["timeE"];
          timeS = data[i]["timeS"];
          _id = data[i]["_id"];
        });
      }
    }
    return "success";
  }

  Widget _backButton() {
    return InkWell(
      onTap: () {
         Navigator.of(context).pushAndRemoveUntil(
                  MaterialPageRoute(
                      builder: (BuildContext context) => Reservation()),
                  (Route<dynamic> route) => false);
      },
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 10),
        child: Row(
          children: <Widget>[
            Container(
              padding: EdgeInsets.only(left: 0, top: 10, bottom: 10),
              child: Icon(Icons.keyboard_arrow_left, color: Colors.black),
            ),
            Text('Back',
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500))
          ],
        ),
      ),
    );
  }

  Widget _updateButton(String t) {
    return InkWell(
        onTap: () {
          Navigator.push(context, MaterialPageRoute(builder: (context) => PaymentScreen(100)));
        },
        child: Container(
          margin: EdgeInsets.only(left: 50),
          width: 200,
          padding: EdgeInsets.symmetric(vertical: 15),
          alignment: Alignment.center,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(5)),
              boxShadow: <BoxShadow>[
                BoxShadow(
                    color: Colors.grey.shade200,
                    offset: Offset(2, 4),
                    blurRadius: 5,
                    spreadRadius: 2)
              ],
              gradient: LinearGradient(
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                  colors: [Color(0xfffbb448), Color(0xfff7892b)])),
          child: Text(
            t,
            style: TextStyle(fontSize: 20, color: Colors.white),
          ),
        ));
  }
    Widget _payButton(String t) {
    return InkWell(
        onTap: () {
          Navigator.push(context, MaterialPageRoute(builder: (context) => PaymentScreen(100)));
        },
        child: Container(
          
          margin: EdgeInsets.all(20),
          width: 50,
          
          padding: EdgeInsets.symmetric(vertical: 15),
          alignment: Alignment.center,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(5)),
              boxShadow: <BoxShadow>[
                BoxShadow(
                    color: Colors.grey.shade200,
                    offset: Offset(2, 4),
                    blurRadius: 5,
                    spreadRadius: 2)
              ],
              gradient: LinearGradient(
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                  colors: [Color(0xfffbb448), Color(0xfff7892b)])),
          child: Text(
            t,
            style: TextStyle(fontSize: 20, color: Colors.white),
          ),
        ));
  }

  Widget _annulerButton(String t) {
    return InkWell(
        onTap: () {
          deleteReservation(_id);
          prefs.remove("name");
          setState(() {
            prefs.clear();
            dateE = "";
            location = "";
            dateS = "";
            matricule = "";
            tPark = "";
            timeE = "";
            timeS = "";
          });
          Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(
                  builder: (BuildContext context) => SecondRoute()),
              (Route<dynamic> route) => false);
        },
        child: Container(
          margin: EdgeInsets.only(left:28),
          width: 100,
          padding: EdgeInsets.symmetric(vertical: 15),
          alignment: Alignment.center,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(5)),
              boxShadow: <BoxShadow>[
                BoxShadow(
                    color: Colors.grey.shade200,
                    offset: Offset(2, 4),
                    blurRadius: 5,
                    spreadRadius: 2)
              ],
              gradient: LinearGradient(
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                  colors: [Color(0xfffbb448), Color(0xfff7892b)])),
          child: Text(
            t,
            style: TextStyle(fontSize: 20, color: Colors.white),
          ),
        ));
  }

  Widget _title() {
    return RichText(
      textAlign: TextAlign.center,
      text: TextSpan(
          text: 'Last',
          style: GoogleFonts.portLligatSans(
            textStyle: Theme.of(context).textTheme.display1,
            fontSize: 30,
            fontWeight: FontWeight.w700,
            color: Color(0xffe46b10),
          ),
          children: [
            TextSpan(
              text: ' Resr',
              style: TextStyle(color: Colors.black, fontSize: 30),
            ),
            TextSpan(
              text: 'vation',
              style: TextStyle(color: Color(0xffe46b10), fontSize: 30),
            ),
          ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (matricule != null) {
      return Scaffold(
          body: SingleChildScrollView(
              child: Container(
        height: MediaQuery.of(context).size.height,
        child: Stack(
          children: <Widget>[
            Positioned(top: 40, left: 0, child: _backButton()),
            Positioned(
                top: -MediaQuery.of(context).size.height * .15,
                right: -MediaQuery.of(context).size.width * .4,
                child: BezierContainer()),
            Container(
              alignment: Alignment.centerLeft,
              margin: EdgeInsets.only(top: 123),
              child: ListView(
                children: <Widget>[
                  _title(),
                  Center(
                      child: ListTile(
                    contentPadding: EdgeInsets.only(
                        top: 20, left: 20, right: 20, bottom: 20),
                    leading:
                        Icon(Icons.place, color: Color(0xfffbb448), size: 45),
                    title: Text(
                      location,
                      style: TextStyle(
                        fontSize: 20,
                      ),
                    ),
                  )),
                  Center(
                      child: ListTile(
                    contentPadding: EdgeInsets.all(20),
                    leading: Icon(
                      Icons.local_taxi,
                      color: Color(0xfffbb448),
                      size: 35,
                    ),
                    title: Text(
                      matricule,
                      style: TextStyle(
                        fontSize: 20,
                      ),
                    ),
                  )),
                  Center(
                      child: ListTile(
                    contentPadding: EdgeInsets.all(20),
                    leading: Icon(Icons.local_parking,
                        color: Color(0xfffbb448), size: 35),
                    title: Text(
                      tPark,
                      style: TextStyle(
                        fontSize: 20,
                      ),
                    ),
                  )),
                  Center(
                      child: ListTile(
                    contentPadding: EdgeInsets.all(20),
                    leading: Icon(Icons.date_range,
                        color: Color(0xfffbb448), size: 35),
                    title: Text(
                      DateFormat.yMMMd().format(DateFormat('yyyy-M-d').parse(dateE)).toString() + "~" + timeE,
                      style: TextStyle(
                        fontSize: 20,
                      ),
                    ),
                  )),
                  Center(
                      child: ListTile(
                    contentPadding: EdgeInsets.all(20),
                    leading: Icon(Icons.date_range,
                        color: Color(0xfffbb448), size: 35),
                    title: Text(
                      DateFormat.yMMMd().format(DateFormat('yyyy-M-d').parse(dateS)).toString() + "~" + timeS,
                      style: TextStyle(
                        fontSize: 20,
                      ),
                    ),
                  )),
                
                  Row(
                    children: <Widget>[
                      _annulerButton("delete "),
                      _updateButton("update "),
                     
                    ],
                  ),
                   _payButton("paypal")
                ],
              ),
            )
          ],
        ),
      )));
    } else {
      return Scaffold(
          body: SingleChildScrollView(
              child: Container(
        height: MediaQuery.of(context).size.height,
        child: Stack(
          children: <Widget>[
            Positioned(top: 40, left: 0, child: _backButton()),
            Positioned(
                top: -MediaQuery.of(context).size.height * .15,
                right: -MediaQuery.of(context).size.width * .4,
                child: BezierContainer()),
            Container(
              alignment: Alignment.centerLeft,
              margin: EdgeInsets.only(top: 123),
              child: ListView(
                children: <Widget>[
                  _title(),
                  Container(
                    width: 200,
                    margin: EdgeInsets.only(top: 150),
                    child: Center(
                      child: _updateButton("Book Now "),
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      )));
    }
  }
}
