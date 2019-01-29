import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name:string//name:string;//declaring the variable and the data type it is
  term:string;//need to declare type of varible for the onSearch function paramaters
  //need to declare type of varible for the onSearch function paramaters
  num:number=100;//setting an original value, uses two way binding to link to ngModel {{num}} in html
  list=[];//need to declare type of varible for the onSearch function paramaters
  constructor(private dataService:DataService) {
  }
  ngOnInit() {
  	// example of variable set above then value set here
  }//life cycle hook that runs when component is initialized
  onSearch(term,num,list){//search function that is used to connect to the esummary ensemble api
  	this.list=[];//have to reset the list variable so new results are not appended, without this reset values are continually added to table each time a new search is performed
  	this.dataService.ngOnInit(this.name,this.num,this.list);//calling the function ngOnInit in the service file data.service.ts
  }
}
