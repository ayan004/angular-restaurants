import { Component, OnInit } from '@angular/core';
import { RestoService } from '../resto.service';
import { Router } from '@angular/router';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-list-resto',
  templateUrl: './list-resto.component.html',
  styleUrls: ['./list-resto.component.scss']
})

export class ListRestoComponent implements OnInit {

  constructor(private resto: RestoService, private router: Router) { }

  collection:any = [];
  restoList:any = [];
  temp = ['add'];
  current_page: any;
  rows_per_page:any;

  ngOnInit(): void {
    this.resto.getList().subscribe((result)=>{
      this.collection = result;
      this.rearrangeCollection();
      this.insertData(); //for pagination
    });
  }

  rearrangeCollection(){
    var count = this.collection.length-1;
    for(var i = 0; i <= count; i++){
      this.restoList[i] = this.collection[count-i];
      this.restoList[i].slNo = i+1;
    }
    // console.log(this.restoList);
  }

  deleteResto(id : any){
    if(confirm('Are you sure?')){
      this.resto.deleteItem(id).subscribe((result)=>{
      window.location.reload();
      });
    }
  }

  // ------------------------------------------------------------------------------
  //code to insert data dynamically [for pagination]

  //code to display the whole data together - inserted dynamically from here

//   pagination= document.getElementById("pagination");
//   insertData(){
//   var tbody: any = document.getElementById("tbody");
//   //run for loop here
//   for(var i = 0; i < this.restoList.length; i++){
//     tbody.innerHTML = tbody.innerHTML + `<tr>
//       <td>` + this.restoList[i].slNo + `</td>
//       <td>` + this.restoList[i].name + `</td>
//       <td>`+ this.restoList[i].email +`</td>
//       <td>` + this.restoList[i].address + `</td>
//       <td>
//         <a href="/delete/` + this.restoList[i].id + `/` + this.restoList[i].slNo + `">
//           <i
//             class="fa fa-trash"
//             style="font-size: 20px; color: red"
//           ></i>
//         </a>
//         <a href="/update/` + this.restoList[i].id + `"> 
//             <i class="fa fa-edit" style="font-size: 20px; color: green"></i>
//         </a>
//     </td>
// </tr>`;
//   }
//   }


//code to setup pagination
  insertData(){
    const tbody = document.getElementById("tbody");
    const paginationEl = document.getElementById("paginationEl");

    this.current_page = 1;
    this.rows_per_page = 10;  

    this.DisplayList(this.restoList, tbody, this.rows_per_page, this.current_page);
    this.SetupPagination(this.restoList, paginationEl, this.rows_per_page);  
  }

DisplayList(restoList: any, tbody: any, rows_per_page: any, current_page: any) {
    tbody.innerHTML = "";
    current_page--;

    let start = rows_per_page * current_page;
    let end = start + rows_per_page;
    let paginatedItems = restoList.slice(start, end);

    for(var i = 0; i < paginatedItems.length; i++){
    tbody.innerHTML = tbody.innerHTML + `<tr>
      <td>` + paginatedItems[i].slNo + `</td>
      <td>` + paginatedItems[i].name + `</td>
      <td>`+ paginatedItems[i].email +`</td>
      <td>` + paginatedItems[i].address + `</td>
      <td>
        <a href="/delete/` + paginatedItems[i].id + `/` + paginatedItems[i].slNo + `">
          <i
            class="fa fa-trash"
            style="font-size: 20px; color: red"
          ></i>
        </a>
        <a href="/update/` + paginatedItems[i].id + `"> 
            <i class="fa fa-edit" style="font-size: 20px; color: green"></i>
        </a>
    </td>
</tr>`;
  }
  }

  SetupPagination(restoList: any, paginationEl: any, rows_per_page: any) {
  paginationEl.innerHTML = "";

  let page_count = Math.ceil(restoList.length / rows_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = this.PaginationButton(i);
    paginationEl.appendChild(btn);
  }
}

 PaginationButton(page: any) {
  let button = document.createElement("button");
  button.innerText = page;
  let tbody = document.getElementById("tbody");

  button.addEventListener("click", (e:Event) =>
    this.DisplayList(this.restoList, tbody, this.rows_per_page, page)
  );

  return button;
}

  // ------------------------------------------------------------------------------

}

// I left at line number 68