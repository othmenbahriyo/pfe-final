import 'package:flutter/material.dart';
import 'package:pfe_1/src/Widget/bezierContainer.dart';
import 'package:google_fonts/google_fonts.dart';

class AboutUs extends StatefulWidget {
  AboutUs({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _AboutUs createState() => _AboutUs();
}

class _AboutUs extends State<AboutUs> {
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

  Widget _entryField() {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Align(
              alignment: Alignment.center,
              child: Text(
                'ImageThe Tree Tronix Technology company has a wide experience in developping software systems for shipbuilding, machine-building, telecommunications, medicine and etc The company offers the services in following areas: Designing databases for systems of any complexity, using CASE product Oracle Designer. The basic used database - Oracle Database. Application of any other databases is possible. Development of the information systems using database (  Oracle, MySQL and etc ) Programming  ( Java, C ++ , Visual Basic, Perl  and etc )  Creating WEB-sites and Internet-portals, which used  database Development of analytical systems with using OLAP technology. OLAP technology allows to make the fast analysis of great volumes of the information at a minimum of expenses.  Consulting services in the information technologies. The analysis of activity of the enterprises for introduction of information technologies. Development and the description business-processes of the enterprise for processing, the analysis and the further application of the information. ',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 13,
                ),
              )),
        ],
      ),
    );
  }

  Widget _title() {
    return RichText(
      textAlign: TextAlign.center,
      text: TextSpan(
          text: 'Ab',
          style: GoogleFonts.portLligatSans(
            textStyle: Theme.of(context).textTheme.display1,
            fontSize: 30,
            fontWeight: FontWeight.w700,
            color: Color(0xffe46b10),
          ),
          children: [
            TextSpan(
              text: 'out',
              style: TextStyle(color: Colors.black, fontSize: 30),
            ),
            TextSpan(
              text: ' Us',
              style: TextStyle(color: Color(0xffe46b10), fontSize: 30),
            ),
          ]),
    );
  }

  Widget _emailPasswordWidget() {
    return Column(
      children: <Widget>[
        _entryField(),
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
          Container(
            padding: EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Expanded(
                  flex: 6,
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
                Expanded(
                  flex: 2,
                  child: SizedBox(),
                )
              ],
            ),
          ),
          Positioned(top: 40, left: 0, child: _backButton()),
          Positioned(
              top: -MediaQuery.of(context).size.height * .15,
              right: -MediaQuery.of(context).size.width * .4,
              child: BezierContainer())
        ],
      ),
    )));
  }
}
