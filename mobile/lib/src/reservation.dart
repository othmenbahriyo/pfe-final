import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:pfe_1/src/Widget/bezierContainer.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:pfe_1/src/consultReservation.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:pfe_1/src/drawer.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Reservation extends StatefulWidget {
  Reservation({Key key, this.title, @required this.back}) : super(key: key);

  final String title;
  bool back;

  @override
  _Reservation createState() => _Reservation(back);
}

class _Reservation extends State<Reservation> {
  DateFormat dateFormat = DateFormat("yyyy-MM-dd");
  bool back;
  var parks = ["Select Parking"];

  var _dateTime = DateTime.now();
  var _dateTimes = DateTime.now();
  var nowDay = DateTime.now();
  static TimeOfDay _time = TimeOfDay.now();
  static TimeOfDay _times = TimeOfDay.now();
  static TimeOfDay nowTime = TimeOfDay.now();
  var _ttime;
  var _ttimes;
  static int price = 0;
  var listPark = [];
  var listReservation = [];
  var longitude = [];
  var latitude = [];
  var lng = [];
  List listDateBetween = [];
  List dateE = [];
  List dateS = [];
  List timeS = [];
  List timeE = [];
  List allMarkers = [];
  int nbRepititionInParking = 0;
  int nbPlaceInPark = 0;
  var selectedLang = "Select Parking";
  var selectedP = "Select Park Type";
  String matricul = "";
  SharedPreferences sharedPreferences;
  
  _Reservation(this.back);

  Future<bool> saveMatricule(String name) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString("name", name);
    return prefs.commit();
  }

  getPark() async {
    http.Response response =
        await http.get("http://172.18.102.225:3000/api/list/parking");

    listPark = json.decode(response.body);

    listPark.forEach((element) {});
    setState(() {
      for (int i = 0; i < listPark.length; i++) {
        parks.add(listPark[i]["name"]);
        latitude.add(double.parse(listPark[i]["latitude"]));
        longitude.add(double.parse(listPark[i]["longitude"]));

      
      }
      listPark.forEach((f) {
        lng.add(
            LatLng(double.parse(f['latitude']), double.parse(f['longitude'])));
      });

      for (int i = 0; i < listPark.length; i++) {
        allMarkers.add(
          Marker(
            markerId: MarkerId('ffff'),
            position: LatLng(double.parse(listPark[i]['latitude']),
                double.parse(listPark[i]['longitude'])),
            icon: BitmapDescriptor.defaultMarker,
          ),
        );

        if (selectedLang == listPark[i]["name"]) {
          nbPlaceInPark = listPark[i]["nbplace"];
          print(nbPlaceInPark);
        }
        
      }
    });
    return "success";
  }

  getLisstRservation() async {
    http.Response response =
        await http.get("http://172.18.102.225:3000/api//list/res");

    listReservation = json.decode(response.body);
    setState(() {
      for (int i = 0; i < listReservation.length; i++) {
        dateS.add(DateFormat('yyyy-M-d').parse(listReservation[i]["dateS"]));
        dateE.add(DateFormat('yyyy-M-d').parse(listReservation[i]["dateE"]));
        timeE.add(TimeOfDay(
            hour: int.parse(listReservation[i]["timeE"].split(":")[0]) ,
            minute: int.parse(listReservation[i]["timeE"].split(":")[1])));
        timeS.add(TimeOfDay(
            hour: int.parse(listReservation[i]["timeS"].split(":")[0]),
            minute: int.parse(listReservation[i]["timeS"].split(":")[1])));
        print(timeE);
        if (listReservation[i]["name"] == selectedLang &&
            _dateTime == dateS[i] &&
            (_time.hour <= dateS[i].hour && _time.minute < dateS[i].minute) &&
            (_time.hour >= dateE[i].hour && _time.minute > dateE[i].minute)) {
          print("cc");
          nbRepititionInParking++;
        }
      }
    });
    return "success";
  }

  void nbPlaceInPar() {
    for (int i = 0; i < listPark.length; i++) {
      if (listPark[i]["name"] == selectedLang) {
        nbPlaceInPark = listPark[i]["nbplace"];
        print("ffffffffffffffffff" + nbPlaceInPark.toString());
      }
    }
  }

  void nbRepitition() {
    nbRepititionInParking = 0;
    for (int j = 0; j < listReservation.length; j++) {
      print(listReservation[j]["name"] == selectedLang &&
          _dateTime.day == dateS[j].day &&
          (_time.hour < timeS[j].hour && _time.minute < timeS[j].minute) &&
          (_time.hour >= timeE[j].hour && _time.minute > timeE[j].minute));
      if (listReservation[j]["name"] == selectedLang &&
          dateS[j].day == _dateTime.day &&
          (_time.hour <= timeS[j].hour && _time.minute < timeS[j].minute) &&
          (_time.hour >= timeE[j].hour && _time.minute > timeE[j].minute)) {
        nbRepititionInParking++;
        listDateBetween.add(timeS[j]);
      }
    }
    print("ggggggg" + nbRepititionInParking.toString());
  }

  firstPlaceVide() {
    listDateBetween.sort((a, b) => a.hour.compareTo(b.hour));
    listDateBetween.sort((a, b) => a.minute.compareTo(b.minute));
  }

  @override
  void initState() {
    super.initState();
    getPark();
    getLisstRservation();
    price = 0;
    print("priceee" + price.toString());
     setState(() {
               for(int i = 0 ; i < listPark.length; i++){
                 price = 0;
                 if (selectedLang == listPark[i]["name"]) {
                    price = listPark[i]["price"];
                    print("prix" + price.toString());
                    return price;
                  } else {
                    price = 0;
                  }
              }
            });
  }

  saveReservation(
      String name, matricule, dateE, dateS, tpark, timeE, timeS) async {
    sharedPreferences = await SharedPreferences.getInstance();
    Map data = {
      'name': name,
      'matricule': matricule,
      'dateE': dateE,
      'dateS': dateS,
      'Tpark': tpark,
      'timeE': timeE,
      'timeS': timeS,
    };
    var jsonResponse = null;
    var response =
        await http.post("http://172.18.102.225:3000/api/saveres", body: data);

    jsonResponse = json.decode(response.body);

    if (jsonResponse != null) {
      sharedPreferences.setString("token", jsonResponse["token"]);
    }
  }

  Widget _backButton() {
    if (back == true) {
      return InkWell(
        onTap: () {
          Navigator.pop(context);
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
    } else {
      return Container(
        width: 0.5,
      );
    }
  }

  Widget _entryField(String title, {bool isPassword = false}) {
    return Container(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: <
            Widget>[
      Text(
        'Parking location',
        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
      ),
      SizedBox(
        height: 10,
      ),
      Container(
        color: Color(0xfff3f3f4),
        child: DropdownButton<String>(
          isExpanded: true,
          items: parks.map((String selectItem) {
            return DropdownMenuItem<String>(
                value: selectItem,
                child: Text(
                  selectItem,
                ));
          }).toList(),
          onChanged: (String theLang ) {
           
            setState(() {
              typePark = ["Select Park Type"];
              selectedLang = theLang;
               for(int i = 0 ; i < listPark.length; i++){
                 price = 0;
                 if (selectedLang == listPark[i]["name"]) {
                    price = listPark[i]["price"];
                    print("prix" + price.toString());
                    typePark.add("normal parking ${price} DT");
                    typePark.add("covred parking ${price + 10} DT");
                    typePark.add("professional parking ${price + 15} DT");
                    return price;
                  }
              }
            });
          },
          value: selectedLang,
        ),
      ),
      Text(
        title,
        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
      ),
      SizedBox(
        height: 10,
      ),
      TextField(
          obscureText: isPassword,
          onChanged: (text) {
            matricul = text;
          },
          decoration: InputDecoration(
              border: InputBorder.none,
              fillColor: Color(0xfff3f3f4),
              hintText: "196 TUN 20569",
              filled: true)),
      Container(
        width: 5,
        margin: EdgeInsets.only(top: 5),
      ),
      Text(
        'Parking Type',
        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
      ),
      Container(
        
        margin: EdgeInsets.only(top: 15),
        color: Color(0xfff3f3f4),
        child: DropdownButton<String>(
        
          isExpanded: true,
          items: typePark.map((String selectItem) {
            return DropdownMenuItem<String>(
              value: selectItem,
              child: Text(selectItem),
              
            );
          }).toList(),
          icon: Icon(Icons.monetization_on),
          onChanged: (String theLang) {
           
             setState(() {
              selectedP = theLang;
             });
            
          },
          value: selectedP,
        ),
      ),
      Container(
        margin: EdgeInsets.all(10),
      ),
      Text(
        'Date & time Entré',
        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
      ),
      Row(
        children: <Widget>[
          IconButton(
            icon: Icon(Icons.date_range, color: Color(0xfffbb448), size: 30),
            onPressed: () {
              showDatePicker(
                      context: context,
                      initialDate:
                          _dateTime == null ? DateTime.now() : _dateTime,
                      firstDate: DateTime(2001),
                      lastDate: DateTime(2050))
                  .then((date) {
                setState(() {
                  _dateTime = date;
                });
              });
            },
          ),
          Text(_dateTime == null
              ? 'Nothing '
              : new DateFormat.yMMMd().format(_dateTime).toString()),
          IconButton(
            icon: Icon(Icons.watch_later, color: Color(0xfffbb448), size: 30),
            onPressed: () {
              showTimePicker(
                context: context,
                initialTime: _time == null ? TimeOfDay.now() : _time,
              ).then((date) {
                setState(() {
                  _time = date;
                  _ttime = _time.hour * 60 + _time.minute;
                });
              });
            },
          ),
          Text(_time == null ? 'Nothing' : "${_time.hour}:${_time.minute}"),
        ],
      ),
      Container(
        margin: EdgeInsets.all(10),
      ),
      Text(
        'Date & time Exit',
        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
      ),
      Row(
        children: <Widget>[
          IconButton(
            icon: Icon(Icons.date_range, color: Color(0xfffbb448), size: 30),
            onPressed: () {
              showDatePicker(
                      context: context,
                      initialDate: _dateTimes == null
                          ? DateTime.now()
                          : DateFormat('yyyy-M-d').parse(_dateTimes.toString()),
                      firstDate: DateTime(2001),
                      lastDate: DateTime(2050))
                  .then((date) {
                setState(() {
                  _dateTimes = date;
                });
              });
            },
          ),
          Text(_dateTimes == null
              ? 'Nothing '
              : new DateFormat.yMMMd().format(_dateTimes).toString()),
          IconButton(
            icon: Icon(Icons.watch_later, color: Color(0xfffbb448), size: 30),
            onPressed: () {
              showTimePicker(
                context: context,
                initialTime: _times == null ? TimeOfDay.now() : _times,
              ).then((date) {
                setState(() {
                  _times = date;
                  _ttimes = _times.hour * 60 + _times.minute;
                });
              });
            },
          ),
          Text(_times == null ? 'Nothing' : "${_times.hour}:${_times.minute}"),
        ],
      )
    ]));
  }

  Widget _submitButton() {
    return InkWell(
        onTap: () {
          nbRepitition();
          nbPlaceInPar();
          if (selectedLang == "Select Parking" ||
              matricul == "" ||
              selectedP == "Select Park Type" ||
              _dateTime.compareTo(_dateTimes) > 0 || 
              (_time.hour <= _times.hour && _time.minute < _times.minute)  == false) {
                print(_time.hour <= _times.hour && _time.minute < _times.minute);
            Fluttertoast.showToast(
                msg: "check your fields",
                toastLength: Toast.LENGTH_LONG,
                gravity: ToastGravity.BOTTOM,
                timeInSecForIosWeb: 1,
                backgroundColor: Color(0xfff7892b),
                textColor: Colors.white,
                fontSize: 29.0);
          } else if (nbPlaceInPark <= nbRepititionInParking) {
            Fluttertoast.showToast(
                msg:
                    "no place now . first place vide at ${listDateBetween[0].hour}:${listDateBetween[0].minute} ",
                toastLength: Toast.LENGTH_LONG,
                gravity: ToastGravity.BOTTOM,
                timeInSecForIosWeb: 1,
                backgroundColor: Color(0xfff7892b),
                textColor: Colors.white,
                fontSize: 30.0);
          } else {
            saveReservation(
                selectedLang,
                matricul,
                DateFormat('yyyy-M-d').parse(_dateTime.toString()).toString(),
                DateFormat('yyyy-M-d').parse(_dateTimes.toString()).toString(),
                selectedP,
                "${_time.hour}:${_time.minute}",
                "${_times.hour}:${_times.minute}");
            Fluttertoast.showToast(
                msg: "reservation saved",
                toastLength: Toast.LENGTH_LONG,
                gravity: ToastGravity.TOP,
                timeInSecForIosWeb: 1,
                backgroundColor: Color(0xfff7892b),
                textColor: Colors.white,
                fontSize: 15.0);
            saveMatricule(matricul).then((bool x) {
              debugPrint("saved");
              setState(() {
                _dateTime = DateTime.now();
                _dateTimes = DateTime.now();
                _time = TimeOfDay.now();
                _times = TimeOfDay.now();
                selectedLang = "Select Parking";
                selectedP = "Select Park Type";
                matricul = " ";
              });
              Navigator.of(context).pushAndRemoveUntil(
                  MaterialPageRoute(
                      builder: (BuildContext context) => Consult()),
                  (Route<dynamic> route) => false);
            });
          }
        },
        child: Container(
          width: MediaQuery.of(context).size.width,
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
            'Booking Now',
            style: TextStyle(fontSize: 20, color: Colors.white),
          ),
        ));
  }

  Widget _title() {
    return RichText(
      textAlign: TextAlign.center,
      text: TextSpan(
          text: 'Boo',
          style: GoogleFonts.portLligatSans(
            textStyle: Theme.of(context).textTheme.display1,
            fontSize: 30,
            fontWeight: FontWeight.w700,
            color: Color(0xffe46b10),
          ),
          children: [
            TextSpan(
              text: 'King',
              style: TextStyle(color: Colors.black, fontSize: 30),
            ),
            TextSpan(
              text: ' now',
              style: TextStyle(color: Color(0xffe46b10), fontSize: 30),
            ),
          ]),
    );
  }

  Widget _emailPasswordWidget() {
    return Column(
      children: <Widget>[
        _entryField("Matricule"),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
            child: Container(
      height: MediaQuery.of(context).size.height,
      child: Stack(
        children: <Widget>[
          Positioned(top: 40, left: 0, child: _backButton()),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              children: <Widget>[
                Expanded(
                  flex: 2,
                  child: SizedBox(),
                ),
                _title(),
                SizedBox(
                  height: 50,
                ),
                _emailPasswordWidget(),
                SizedBox(
                  height: 20,
                ),
                _submitButton(),
                Expanded(
                  flex: 2,
                  child: SizedBox(),
                ),
              ],
            ),
          ),
          Positioned(
              top: -MediaQuery.of(context).size.height * .19,
              right: -MediaQuery.of(context).size.width * .6,
              child: BezierContainer()),
        ],
      ),
    )));
  }
  var typePark = [
    price.toString(),
    (price + 10).toString(),
    (price + 15).toString(),
    "Select Park Type"
  ];
}
