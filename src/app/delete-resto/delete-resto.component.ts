import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestoService } from '../resto.service';

@Component({
  selector: 'app-delete-resto',
  templateUrl: './delete-resto.component.html',
  styleUrls: ['./delete-resto.component.scss']
})
export class DeleteRestoComponent implements OnInit {

  restaurant : any;
  slNo : any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private resto: RestoService) { }

  ngOnInit(): void {
    if(confirm('Are you sure?')){
      var id = this.activatedRoute.snapshot.params.id;
      this.resto.getById(id).subscribe((result)=>{
              this.resto.deleteItem(id).subscribe(()=>{
          this.restaurant = result;
        });
        this.slNo = this.activatedRoute.snapshot.params.slNo;
      });
      } else {
        console.log("You confirm not to delete");
        this.router.navigate(['']);
      }
  }
 
}


