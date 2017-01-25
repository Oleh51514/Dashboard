import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';

import { UserManagementComponent } from './user-management.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: UserManagementComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class UserManagementRoutingModule { }

