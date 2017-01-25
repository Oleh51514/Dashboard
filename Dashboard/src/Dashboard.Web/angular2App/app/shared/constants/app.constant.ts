import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = 'https://localhost:44318/';
    public FileServer: string = 'https://localhost:44378/';
}