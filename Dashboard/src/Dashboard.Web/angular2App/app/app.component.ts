import { Component, OnInit } from '@angular/core';
import { SecurityService } from './shared/services/security.service';

import './app.component.css';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

    constructor(public securityService: SecurityService) {
    }

    ngOnInit() {
        // console.log('ngOnInit _securityService.AuthorizedCallback');

        // if (window.location.hash) {
        //     this.securityService.AuthorizedCallback();
        // }
    }

    // public Login() {
    //     console.log('Do login logic');
    //     this.securityService.Authorize();
    // }

    // public Logout() {
    //     console.log('Do logout logic');
    //     this.securityService.Logoff();
    // }
}