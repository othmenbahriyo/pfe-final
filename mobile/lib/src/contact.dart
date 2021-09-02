import 'package:flutter/material.dart';
import 'package:pfe_1/src/Widget/bezierContainer.dart';
import 'package:google_fonts/google_fonts.dart';

class Contact extends StatefulWidget {
  Contact({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _Contact createState() => _Contact();
}

class _Contact extends State<Contact> {
  Widget _backButton() {
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
  }

  Widget _title() {
    return RichText(
      textAlign: TextAlign.center,
      text: TextSpan(
          text: 'Cont',
          style: GoogleFonts.portLligatSans(
            textStyle: Theme.of(context).textTheme.display1,
            fontSize: 30,
            fontWeight: FontWeight.w700,
            color: Color(0xffe46b10),
          ),
          children: [
            TextSpan(
              text: 'act',
              style: TextStyle(color: Colors.black, fontSize: 30),
            ),
            TextSpan(
              text: ' Us',
              style: TextStyle(color: Color(0xffe46b10), fontSize: 30),
            ),
          ]),
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
          Positioned(
              top: -MediaQuery.of(context).size.height * .15,
              right: -MediaQuery.of(context).size.width * .4,
              child: BezierContainer()),
          Container(
            alignment: Alignment.centerLeft,
            margin: EdgeInsets.only(top: 200),
            child: ListView(
              children: <Widget>[
                _title(),
                Center(
                    child: ListTile(
                  contentPadding:
                      EdgeInsets.only(top: 20, left: 10, right: 35, bottom: 10),
                  leading:
                      Icon(Icons.place, color: Color(0xfffbb448), size: 45),
                  title: Align(
                      alignment: Alignment.center,
                      child: Text(
                        'Immeuble Nefissa,31 Rue des Entrepreneurs,Charguia 2,Tunis 2035',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 20,
                        ),
                      )),
                )),
                Center(
                    child: ListTile(
                  contentPadding: EdgeInsets.all(10),
                  leading: Icon(
                    Icons.email,
                    color: Color(0xfffbb448),
                    size: 35,
                  ),
                  title: Text(
                    'contact@treetronix.com',
                    style: TextStyle(
                      fontSize: 20,
                    ),
                  ),
                )),
                Center(
                    child: ListTile(
                  contentPadding: EdgeInsets.all(10),
                  leading:
                      Icon(Icons.phone, color: Color(0xfffbb448), size: 35),
                  title: Text(
                    '+216 71 111 100',
                    style: TextStyle(
                      fontSize: 20,
                    ),
                  ),
                )),
                Center(
                    child: ListTile(
                  contentPadding:
                      EdgeInsets.only(top: 10, left: 10, right: 10, bottom: 35),
                  leading: Icon(Icons.web, color: Color(0xfffbb448), size: 35),
                  title: Text(
                    'http://www.treetronix.com',
                    style: TextStyle(
                      fontSize: 20,
                    ),
                  ),
                )),
                Center(
                  child: Text(
                      "Feel free to contact us ... we are happy to serve you"),
                )
              ],
            ),
          )
        ],
      ),
    )));
  }
}
