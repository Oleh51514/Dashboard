import { Routes, RouterModule } from '@angular/router';

import { ForbiddenComponent } from './modules/forbidden/forbidden.component';
import { HomeComponent } from './modules/home/home.component';
import { TestComponent } from './modules/test/test.component';
import { UnauthorizedComponent } from './modules/unauthorized/unauthorized.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'test', component: TestComponent },
    { path: 'Forbidden', component: ForbiddenComponent },
    { path: 'Unauthorized', component: UnauthorizedComponent },
    { path: 'Admin', loadChildren: './modules/admin/admin.module#AdminModule' },
    { path: 'UserManagement', loadChildren: './modules/user-management/user-management.module#UserManagementModule' }
];

export const routing = RouterModule.forRoot(appRoutes);
