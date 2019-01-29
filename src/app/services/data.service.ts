//modules that are needed are introduced here
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {HttpClient} from '@angular/common/http';//needed to connect to api

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) {//make sure constructor paramater matches with httpclient
  }
  ngOnInit(term,n,list): void {
  	var i;//introducing variables
  	var d;
  	var j;
		var l;
    term=term.replace(" ","%20");//if there is a space in the term search, there will need to be a %20 added to fulfill the website link.
    this.http.get('http://rest.ensembl.org/phenotype/term/homo_sapiens/'+term+'?content-type=application/json').subscribe(data => { //lowercase html has to match with constructor paramater, this is the api call to the ensebl api, retrieving esummary data based on term the user has inputed  
      for (i = 0; i < n; i++) { //for loop goes through the number of records selected by user
    	var pid="";//single pid used for pub med links 
    	var plist: any[] =[];//list of pmid when one record has mutiple
    	var refr="";//type of id used in link
    	var locl ="https://useast.ensembl.org/Homo_sapiens/Location/View?r=";//this is link for the location 
    	var llist = []; //list used in splicing data for location
    	var chr="";//chromosome for the position, input for link
    	var schr=[];//complex string chr
    	var sschr=[];//complex string divider list
    	llist = data[i].location.split(":");
    	chr = llist[0];
    	if (chr.length>2){
    		chr="";
    		schr=llist[0].split("CHR");
    		sschr=schr[schr.length-1].match(/[a-zA-Z]+|[0-9]+/g)//split and create list based on non number to reveal the final chromosome position out of complex string
    		chr=sschr[0]
    	}
    	var locl =locl+chr+"%3A"+llist[1];//compiling the link for the location to be used
    	if (data[i].attributes != undefined){//some data objects do not have attributes, those that do need to have their pub med ids linked to a website, here we create that link
    		refr = data[i].attributes.external_reference
	    	if (data[i].attributes.external_reference != undefined && data[i].attributes.external_reference.includes('PMID')){ //if there is an external reference, it continues
	    		if (data[i].attributes.external_reference.includes(',PMID')){//if there are multiple pmids, there needs to be multiple links
	    		//!!NOTED ERROR!! multiple gene rows put out due to double pmids, leading to innaccurate row counts from input because more rows are being added, need to address later
	    			var plist:any[] = data[i].attributes.external_reference.split(",PMID:");
	    			plist[0]=plist[0].replace("PMID:","");
	    			for (j=0; j < plist.length; j++){//adds each pmid gene intp data field when list gets ob pushed to it
	    				plist[j]= "https://www.ncbi.nlm.nih.gov/pubmed/?term="+plist[j];
	    				var ob = {source:data[i].source,ref:"PMID:",link:plist[j],v:data[i].Variation,loco:"chr:"+chr+"   "+llist[1],loc:locl,d:data[i].description,g:data[i].attributes.associated_gene,cs:data[i].attributes.clinical_significance,test:1}//these are all the data points that will be inputed into the table as {{f."key"}} 
    					list.push(ob);
	    			}
	    		} else {
	    		pid = "https://www.ncbi.nlm.nih.gov/pubmed/?term="+data[i].attributes.external_reference.replace("PMID:","");
	    		var ob1 = {source:data[i].source,ref:"PMID:",link:pid,v:data[i].Variation,loco:"chr:"+chr+"   "+llist[1],loc:locl,d:data[i].description,g:data[i].attributes.associated_gene,cs:data[i].attributes.clinical_significance,test:2}//these are all the data points that will be inputed into the table as {{f."key"}}, this input is just for single pmid cases, the majority
    			list.push(ob1);
	    	}
	    	} else {
	    pid = "https://www.ncbi.nlm.nih.gov/clinvar/?term="+data[i].Variation;//using rs id for weblink if there is no pmid available, usually used with clinvar sources
    	var ob2 = {source:data[i].source,ref:"rs",link:pid,v:data[i].Variation,loco:"chr:"+chr+"   "+llist[1],loc:locl,d:data[i].description,g:data[i].attributes.associated_gene,cs:data[i].attributes.clinical_significance,test:3};//input for the list that will be returned to the
    	list.push(ob2);
    	//ERRORS:
    	//modules that are needed are introduced here
		//Next steps: Upload the web application to server, git hub account to show code
		//edit faulty links that come up during continuing use casese
		//fix error which occurs that ends the data table prior to record limit when coffee consumption is searched
		//figure out how to sort the result search for based on important characteristics
		// find out more about the end user, likely bioinformatician, what other tools they need to use
    }
    };
	 }
	})
}
}