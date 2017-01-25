import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';

import { SecurityService } from '../../shared/services/security.service';
import { UserManagementService } from '../../shared/services/user-management.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UserManagementRoutingModule
    ],
    declarations: [
        UserManagementComponent
    ],
    providers: [
        SecurityService,
        UserManagementService
    ]
})
export class UserManagementModule {
}