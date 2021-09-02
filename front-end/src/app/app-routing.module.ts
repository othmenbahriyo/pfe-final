import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { MapComponent } from './map/map.component';
import { PresentationComponent } from './presentation/presentation.component';
import { PriceComponent } from './price/price.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { PaimentComponent } from './paiment/paiment.component';
import { GestionComponent } from './gestion/gestion.component';
import { AdminComponent } from './admin/admin.component';
import { MatBoardComponent } from './mat-board/mat-board.component';
import { GparkComponent } from './gpark/gpark.component';
import { TableauComponent } from './tableau/tableau.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { GmapsComponent } from './gmaps/gmaps.component';
import { ChComponent } from './ch/ch.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { AddParkComponent } from './add-park/add-park.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SuperviseurGuard } from './guards/superviseur.guard';




const routes: Routes = [
  {path: '', redirectTo: 'map', pathMatch: 'full'},
  {path: 'admin', redirectTo: 'gpark', pathMatch: 'full'},
  {path: 'table', component: TableauComponent, canActivate: [SuperviseurGuard]},
  {path: 'registre', component: RegisterComponent},
  {path: 'pres', component: PresentationComponent},
  {path: 'admin', component: AdminComponent, canActivate: [SuperviseurGuard ] },
  {path: 'dash', component: MatBoardComponent, canActivate: [SuperviseurGuard ]},
  {path: 'gpark', component: GparkComponent, canActivate: [SuperviseurGuard ]},
  {path: 'price', component: PriceComponent},
  {path: 'reserve', component: ReservationComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'mp', component: GmapsComponent, canActivate: [AdminGuard ]},
  {path: 'my', component: MyDialogComponent},
  {path: 'ft', component: FooterComponent},
  {path: 'gestion', component: GestionComponent, canActivate: [AuthGuard ] },
  {path: 'pay', component: PaimentComponent, canActivate: [AuthGuard]},
  {path: 'map', component: MapComponent},
  {path: 'ch', component: ChComponent, canActivate: [AuthGuard]},
  {path: 'ap', component: AddParkComponent, canActivate: [AdminGuard ]},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path: 'ad', component: AdminEventsComponent, canActivate: [AdminGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
