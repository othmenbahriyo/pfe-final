import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PresentationComponent } from './presentation/presentation.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RegisterComponent } from './register/register.component';
import { MapComponent } from './map/map.component';
import { ReservationComponent } from './reservation/reservation.component';
import { PriceComponent } from './price/price.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { IgxTimePickerModule } from 'igniteui-angular';
import { LoginComponent } from './login/login.component';
import { PaimentComponent } from './paiment/paiment.component';
import { GestionComponent } from './gestion/gestion.component';
import { AdminComponent } from './admin/admin.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatBoardComponent } from './mat-board/mat-board.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { GparkComponent } from './gpark/gpark.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { TableauComponent } from './tableau/tableau.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgxStripeModule } from 'ngx-stripe';
import {  ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';
import { MatDialogModule } from '@angular/material/dialog';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { AdminGuard } from './guards/admin.guard';
import { AuthService } from './shared/auth.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReservationService } from './shared/reservation.service';
import { ParkService } from './shared/park.service';
import { ChatService } from './shared/chat.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { PlaceGestionComponent } from './place-gestion/place-gestion.component';
import { ChComponent } from './ch/ch.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RatingModule } from 'ng-starrating';
import { ConsulteResComponent } from './consulte-res/consulte-res.component';
import { FooterComponent } from './footer/footer.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgTempusdominusBootstrapModule } from 'ngx-tempusdominus-bootstrap';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AddParkComponent } from './add-park/add-park.component';
import { TranslateModule , TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ChartModule } from 'angular2-chartjs';
import {NgxPrintModule} from 'ngx-print';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { NgxGeoautocompleteModule } from 'ngx-geoautocomplete';
import { NguiMapModule} from '@ngui/map';
export function HttpLoaderFactory(http: HttpClient) {
  // tslint:disable-next-line:no-unused-expression
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    NavbarComponent,
    RegisterComponent,
    MapComponent,
    ReservationComponent,
    PriceComponent,
    ContactComponent,
    LoginComponent,
    PaimentComponent,
    GestionComponent,
    AdminComponent,
    MatBoardComponent,
    GparkComponent,
    GmapsComponent,
    TableauComponent,
    MyDialogComponent,
    AdminEventsComponent,
    PlaceGestionComponent,
    ChComponent,
    ConsulteResComponent,
    FooterComponent,
    AddParkComponent,
    ForgotPasswordComponent,

  ],
  entryComponents: [ConsulteResComponent],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    RatingModule,
    GooglePlaceModule,
    AutocompleteLibModule,
    Ng4GeoautocompleteModule.forRoot(),
    NgxGeoautocompleteModule.forRoot(),
    MatCardModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    SimpleNotificationsModule.forRoot(),
    TimepickerModule.forRoot(),
    BrowserAnimationsModule,
    NgxMatDatetimePickerModule, NgxMatTimepickerModule,
    MatDatepickerModule,
    NgTempusdominusBootstrapModule,
    Ng2FlatpickrModule,
    MatInputModule,
    NgxPrintModule,
    ChartModule,
    HttpClientModule,
    NgxPayPalModule,
    AppRoutingModule,
    ChartsModule,
    NgxMaterialTimepickerModule,
    IgxTimePickerModule,
    MatSliderModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAFgM81Qz-SwfTzUsr4F51AgDj0HdN88CQ'}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAC_TOUb7r8JDCmM_kcd0f-vHW_mQC_X7Q',
      libraries: ['places']
    }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatCardModule,
    MatMenuModule,
    NgxStripeModule.forRoot('pk_test_qpj9EFKeYbrkjiasiPfWlHtC00MEUchuHM')
  ],
  providers: [AuthService, ReservationService , ParkService, AuthGuard, ChatService , AdminGuard ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
