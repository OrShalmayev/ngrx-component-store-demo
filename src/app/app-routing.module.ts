import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./core/components/not-found/not-found.component";
import {EAppRoutes} from "./models/routes.model";

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/main/main.module').then(module => module.MainModule)
    },
    {
        path: EAppRoutes.ComponentStoreRoute,
        loadChildren: () => import('./modules/parking-lot-cmp-store/parking-lot-cmp-store.module').then(module => module.ParkingLotCmpStoreModule)
    },
    {
        path: EAppRoutes.ComponentWithServiceRoute,
        loadChildren: () => import('./modules/parking-lot-service/parking-lot-service.module').then(module => module.ParkingLotServiceModule)
    },
    {
        path: EAppRoutes.Component,
        loadChildren: () => import('./modules/parking-lot-component/parking-lot-component.module').then(module => module.ParkingLotComponentModule)
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
