import { Routes } from "@angular/router";
import { DetalleComponent } from "../ingreso-egreso/detalle/detalle.component";
import { EstadisticasComponent } from '../ingreso-egreso/estadisticas/estadisticas.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';


export const dashBoardRouter: Routes = [
    
    { path:'' , component: EstadisticasComponent},
    { path:'ingreso-egreso' , component: IngresoEgresoComponent},
    { path:'detalle' , component: DetalleComponent},
    
]