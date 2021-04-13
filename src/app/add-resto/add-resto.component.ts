import { AssertNotNull } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'; 
import { RestoService } from '../resto.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-resto',
  templateUrl: './add-resto.component.html',
  styleUrls: ['./add-resto.component.scss']
})

export class AddRestoComponent implements OnInit {

  constructor(private resto: RestoService, private routerLink: Router) {}

  addResto = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    address: new FormControl('')
  })
  
  ngOnInit(): void {
  }

  // alert: boolean = false;

  collectResto(){
    if(this.checkEmail()){
      this.resto.saveResto(this.addResto.value).subscribe(()=>{
      // this.alert = true;
      this.addResto.reset({});
      var warnOnEmail: any = document.getElementById("warnOnEmail");
      warnOnEmail.innerText = "";
      if(confirm('Data added sucessfully...Want to add more?')){
        window.location.reload();
      } else {
        this.routerLink.navigate(['']);
      }
    });
    }
  }

  checkEmail(){
    var email = this.addResto.value.email;
    if(email.includes("@")){
      if(email.includes(".")){
        return true;
      } else {
      var warnOnEmail: any= document.getElementById("warnOnEmail");
      warnOnEmail.innerText = "* entered email is wrong";
      return false;  
      }
    } else {
      var warnOnEmail: any= document.getElementById("warnOnEmail");
      warnOnEmail.innerText = "* entered email is wrong";
      return false;
    }
  }

  // closeAlert(){
  //   this.alert = false;
  // }

}
