import { Routes } from '@angular/router';

import { ListComponent } from './views/list/list.component';
import { PacientDetailsComponent } from './views/pacient-details/pacient-details.component';
import { PacientReportsComponent } from './views/pacient-reports/pacient-reports.component';
import { PacientPrescriptionsComponent } from './views/pacient-prescriptions/pacient-prescriptions.component';
import { ReportingComponent } from './views/reporting/reporting.component';


export const routes: Routes = [

    { path: 'list', component: ListComponent },
    { path: 'details/:id', component: PacientDetailsComponent },
    { path: 'reports/:id', component: PacientReportsComponent },
    { path: 'prescriptions/:id', component: PacientPrescriptionsComponent },
    { path: 'reporting', component: ReportingComponent },

    { path: '', redirectTo: '/list', pathMatch: 'full'}
    
];
