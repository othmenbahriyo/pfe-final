import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapSample extends StatefulWidget {
  List<Marker> list = [];
  String title = "Our park";
  MapSample({Key key, this.title, @required this.list}) : super(key: key);
  @override
  State<MapSample> createState() => MapSampleState(list);
}

class MapSampleState extends State<MapSample> {
  var listPark = [];
  var park = [];
  var longitude = [];
  List lng = [];
  var latitude = [];
  List allMarkerss = [];
  List<Marker> list = [];
  static LatLng latLngMarker;

  MapSampleState(this.list);

  getPark() async {
    http.Response response =
        await http.get("http://172.18.102.225:3000/api/list/parking");

    listPark = json.decode(response.body);
    print(listPark.length);
    print(listPark[1]["name"]);
    setState(() {
      for (int i = 0; i < listPark.length; i++) {
        print(listPark[i]["name"]);
        park.add(listPark[i]);
        print(park);
        print(listPark[i]["longitude"]);
        print(listPark[i]["latitude"]);
        latitude.add(double.parse(listPark[i]["latitude"]));
        longitude.add(double.parse(listPark[i]["longitude"]));
        listPark.forEach((f) {
          lng.add(LatLng(
              double.parse(f['latitude']), double.parse(f['longitude'])));
          print(lng);
          latLngMarker = LatLng(double.parse(listPark[1]["latitude"]),
              double.parse(listPark[1]["longitude"]));
          // for (int i = 0; i < listPark.length; i++) {
          //   setState(() {
          //     allMarkers.add(
          //     Marker(
          //       markerId: MarkerId('ffff'),
          //       position: LatLng(double.parse(listPark[i]['latitude']),
          //           double.parse(listPark[i]['longitude'])),
          //       icon: BitmapDescriptor.defaultMarker,
          //     ),
              
          //   );
          //   });
            
          //   print(allMarkers);
          // }
        });
      }
    });
    return "success";
  }

  Completer<GoogleMapController> _controller = Completer();
  List allMarkers = [
    Marker(
      markerId: MarkerId('ffff'),
      position: LatLng(36.8540321, 10.2071132),
      icon: BitmapDescriptor.defaultMarker,
    ),
    Marker(
      markerId: MarkerId('ffff'),
      position: LatLng(40.745803, -73.988213),
      icon: BitmapDescriptor.defaultMarker,
    ),
    Marker(
      markerId: MarkerId('ffff'),
      position: LatLng(40.751908, -73.989804),
      icon: BitmapDescriptor.defaultMarker,
    ),
    Marker(
      markerId: MarkerId('ffff'),
      position: LatLng(132.643192 , -30.207954),
      icon: BitmapDescriptor.defaultMarker,
    ),
  ];
  Set<Marker> _markers = {};
  static final CameraPosition _kGooglePlex =
      CameraPosition(target: LatLng(36.8540321, 10.2071132), zoom: 1);

  @override
  void initState() {
    super.initState();
    getPark();
    // setState(() {
    //   for(int i = 0 ; i<listPark.length ; i++) {
    //       allMarkers.add(
    //             Marker(
    //               markerId: MarkerId('ffff'),
    //               position: LatLng(double.parse(listPark[i]['latitude']), double.parse(listPark[i]['longitude'])),
    //               icon: BitmapDescriptor.defaultMarker ,
    //             ),

    //         );
    //         print(allMarkers);
    //         }

    // });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: AppBar(title: Text("Our park"),backgroundColor: Color(0xfffbb448),),
      body: GoogleMap(
        mapType: MapType.normal,
        initialCameraPosition: _kGooglePlex,
        myLocationEnabled: true,
        compassEnabled: true,
        markers: Set.from(allMarkers),
        onMapCreated: (GoogleMapController controller) {
          _controller.complete(controller);
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
          });
        },
      ),
      
    );
  }
}
