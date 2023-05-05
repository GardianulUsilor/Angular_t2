import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/custom-validator';
import { Car } from 'src/app/interfaces/cars';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  //*code for table
  editCache: { [key: string]: { edit: boolean; data: Car } } = {};
  listOfData: Car[] = [];
  ifChecked:boolean = false;

  startEdit(id: string): void {
    this.isVisibleEdit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
//*end for code for table

//*code for icon
addToWishlist1(id: string)
{
  this.listOfData.forEach(item => {
    if(item.id == id)
    item.wishlist = true;
  });
}
addToWishlist2(id: string)
{
  this.listOfData.forEach(item => {
    if(item.id == id)
    item.wishlist = false;
  });
}
//*initialization
  ngOnInit(): void {
    this.listOfData = this.carService.cars;
    this.updateEditCache();
    this.initializeForm();
  }

//*code for modals
  isVisibleAdd = false;
  isOkLoadingAdd = false;

  isVisibleEdit = false;
  isOkLoadingEdit = false;
  showModal(): void {
    this.isVisibleAdd = true;
  }

  handleOk(): void {
    var car:Car = {id:'',make: this.loginForm.get('make')?.value, model: this.loginForm.get('model')?.value,
    year:this.loginForm.get('year')?.value, country:this.loginForm.get('country')?.value, price:this.loginForm.get('price')?.value,
    wishlist:false};
    this.carService.addCar(car);
    this.isOkLoadingAdd = true;
    this.carService.carSubject.subscribe();
    setTimeout(() => {
      this.isVisibleAdd = false;
      this.isOkLoadingAdd = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisibleAdd = false;
  }

  handleOkEdit(): void {
    var id = this.loginForm.get('id')?.value;
    this.listOfData.forEach(item => {
      if(item.id == id)
      item.make = this.loginForm.get('make')?.value;
      item.model = this.loginForm.get('model')?.value;
      item.country = this.loginForm.get('country')?.value;
      item.year = this.loginForm.get('year')?.value;
      item.price = this.loginForm.get('price')?.value;
      item.wishlist = false;
    });
    setTimeout(() => {
      this.isVisibleEdit = false;
      this.isOkLoadingEdit = false;
    }, 3000);
  }

  handleCancelEdit(): void {
    this.isVisibleEdit = false;
  }
//* form code
loginForm!: FormGroup;
submitForm(){
  console.log();
}
initializeForm():void{
  this.loginForm = new FormGroup({
    make: new FormControl(null, [Validators.required]),
    model: new FormControl('',[Validators.required]),
    year:new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
  });
  
}
get model():FormControl{
  return this.loginForm.get('model') as FormControl;
}
get make():FormControl{return this.loginForm.get('make') as FormControl;}
get year():FormControl{return this.loginForm.get('year') as FormControl;}
get country():FormControl{return this.loginForm.get('country') as FormControl;}
get price():FormControl{return this.loginForm.get('price') as FormControl;}
get id():FormControl{return this.loginForm.get('id') as FormControl}
//*constructor and injection
  constructor(private carService:CarsService){}
}
