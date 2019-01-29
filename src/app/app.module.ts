//module file that every module that has to be added to that is used in any of tha angular files, need to get the module from accurate file location, all modules used are bellow
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import {DataService} from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent//list of all the components used, user component is connect to appcomponent, user component has functions, calls the service.
  ],
  imports: [
    BrowserModule,
    HttpModule, HttpClientModule, FormsModule//where all modules must be declared again
  ],
  providers: [DataService],//services go into here
  bootstrap: [AppComponent]
})
export class AppModule { }
//this is meeting place of everything that happens, compenets and modules need to be imported here