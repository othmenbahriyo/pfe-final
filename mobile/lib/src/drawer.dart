import 'package:flutter/material.dart';
import 'package:flutter_facebook_login/flutter_facebook_login.dart';
import 'package:pfe_1/src/about.dart';
import 'package:pfe_1/src/consultReservation.dart';
import 'package:pfe_1/src/contact.dart';
import 'package:pfe_1/src/loginPage.dart';
import 'package:pfe_1/src/map.dart';
import 'package:pfe_1/src/reservation.dart';
import 'package:pfe_1/src/taj.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:google_maps_flutter/google_maps_flutter.dart';

class SecondRoute extends StatefulWidget {
  @override
  MyHomePage createState() => MyHomePage();
}

class MyHomePage extends State<SecondRoute> {
  bool a = true;
  final facebookLogin = FacebookLogin();
  List<Marker> allMarkers = [];
  List listPark = [];

  SharedPreferences sharedPreferences;

  getPark() async {
    http.Response response =
        await http.get("http://172.18.102.225:3000/api/list/parking");

    listPark = json.decode(response.body);

    listPark.forEach((element) {});
    setState(() {
      for (int i = 0; i < listPark.length; i++) {
        allMarkers.add(
          Marker(
            markerId: MarkerId('ffff'),
            position: LatLng(double.parse(listPark[i]['latitude']),
                double.parse(listPark[i]['longitude'])),
            icon: BitmapDescriptor.defaultMarker,
          ),
        );
      }
      print(allMarkers);
    });
    return "success";
  }

  @override
  void initState() {
    super.initState();
    getPark();
  }

  @override
  Widget build(BuildContext context) {
    checkLoginStatus() async {
      sharedPreferences = await SharedPreferences.getInstance();
      if (sharedPreferences.getString("token") == null) {
        Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(builder: (BuildContext context) => LoginPage()),
            (Route<dynamic> route) => false);
      }
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(
          "TREE PARK",
        ),
        backgroundColor: Color(0xfff7892b),
      ),
      body: Center(child: Reservation()),
      drawer: Drawer(
        child: ListView(
          // Important: Remove any padding from the ListView.
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              child: Text(
                'TREE PARK',
                style: TextStyle(
                  fontSize: 50,
                ),
              ),
              decoration: BoxDecoration(
                color: Color(0xfffbb448),
              ),
            ),
            ListTile(
              leading: Icon(Icons.payment),
              title: Text(
                'Book now',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => Reservation(back: true)));
              },
            ),
            ListTile(
              leading: Icon(Icons.place),
              title: Text(
                'Our park',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => MapSample(list: allMarkers)));
              },
            ),
            ListTile(
              leading: Icon(Icons.book),
              title: Text(
                'Consult reservation',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => Consult()));
              },
            ),
            
            ListTile(
              leading: Icon(Icons.contact_phone),
              title: Text(
                'Contact Us',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => Contact()));
              },
            ),
            ListTile(
              leading: Icon(Icons.book),
              title: Text(
                'About Us',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => AboutUs()));
              },
            ),
            ListTile(
              leading: Icon(Icons.leak_remove),
              title: Text(
                'Logout',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
              onTap: () {
                facebookLogin.logOut();
                Navigator.of(context).pushAndRemoveUntil(
                    MaterialPageRoute(
                        builder: (BuildContext context) => LoginPage()),
                    (Route<dynamic> route) => false);
              },
            ),
          ],
        ),
      ),
    );
  }
}
