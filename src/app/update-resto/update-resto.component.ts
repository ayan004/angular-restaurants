import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestoService } from '../resto.service';

@Component({
  selector: 'app-update-resto',
  templateUrl: './update-resto.component.html',
  styleUrls: ['./update-resto.component.scss']
})

export class UpdateRestoComponent implements OnInit {

  alert: boolean = false;

  editResto = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl('')
  })

  constructor(private router: ActivatedRoute, private resto: RestoService, private routerLink: Router) { }

  ngOnInit(): void {
    this.resto.getCurrentResto(this.router.snapshot.params.id).subscribe((result) => {
      this.editResto = new FormGroup({
        name: new FormControl((<any>result).name),
        email: new FormControl((<any>result).email),
        address: new FormControl((<any>result).address)
      })
    });
  }

  updateResto() {
    if (this.checkEmail()) {
      this.resto.deleteItem(this.router.snapshot.params.id).subscribe(() => {
        this.resto.saveResto(this.editResto.value).subscribe(() => {
          this.alert = true;
          var warnOnEmail: any = document.getElementById("warnOnEmail");
          warnOnEmail.innerText = "";
          this.editResto.reset({});
          alert('Data updated sucessfully');
          this.routerLink.navigate(['']);
        });
      });
    }
  }

  checkEmail() {
    var email = this.editResto.value.email;
    if (email.includes("@")) {
      if (email.includes(".")) {
        return true;
      } else {
        var warnOnEmail: any = document.getElementById("warnOnEmail");
        warnOnEmail.innerText = "* entered email is wrong";
        return false;
      }
    } else {
      var warnOnEmail: any = document.getElementById("warnOnEmail");
      warnOnEmail.innerText = "* entered email is wrong";
      return false;
    }
  }

  closeAlert() {
    this.alert = false;
  }

}

//5:36
//8:10
