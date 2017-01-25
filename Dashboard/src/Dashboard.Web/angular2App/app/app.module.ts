import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { Configuration } from './shared/constants/app.constant';
import { routing } from './app.routes';
import { HttpModule, JsonpModule } from '@angular/http';

import { SecurityService } from './shared/services/security.service';


import { NgReduxModule, NgRedux } from 'ng2-redux';
import { NgReduxRouterModule, NgReduxRouter } from 'ng2-redux-router';

import { ForbiddenComponent } from './modules/forbidden/forbidden.component';
import { HomeComponent } from './modules/home/home.component';
import { TestComponent } from './modules/test/test.component';
import { WorkspaceComponent } from './layouts/workspace/workspace.component';
import { UnauthorizedComponent } from './modules/unauthorized/unauthorized.component';

import { RootState, enhancers } from './redux/store/index';
import reducer from './redux/reducers/index';
const createLogger = require('redux-logger');

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        
        NgReduxModule.forRoot(),
        NgReduxRouterModule,

        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        ForbiddenComponent,
        HomeComponent,
        TestComponent,
        WorkspaceComponent,
        UnauthorizedComponent
    ],
    providers: [
        SecurityService,
        Configuration
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
  constructor(
    ngRedux: NgRedux<any>,
    ngReduxRouter: NgReduxRouter
  ) {
    ngRedux.configureStore(
        reducer,
        { },
        [ createLogger() ],
        enhancers
    );
    ngReduxRouter.initialize();
  }
}