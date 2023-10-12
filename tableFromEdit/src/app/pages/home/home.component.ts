import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car, Color } from 'src/app/models/car.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'carName',
    'instock',
    'horsePower',
    'price',
    'color',
    'edit',
  ];
  dataSource = new MatTableDataSource<Car>([]);
  formGroup: FormGroup;
  colors: Color[] = [];
  status: string = 'table';
  selectedCar: Car;
  loading: boolean = true;

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder
  ) {}

  createForm() {
    this.formGroup = this.formBuilder.group({
      id: [{ value: null, disabled: true }, Validators.required],
      carName: [{ value: null, disabled: true }, Validators.required],
      instock: [null, Validators.required],
      horsePower: [
        null,
        [Validators.required, Validators.max(550), Validators.min(100)],
      ],
      price: [null, Validators.required],
      color: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.getCars();
    this.getColors();
  }
  getCars() {
    this.carService.getCars().subscribe({
      next: (res) => {
        this.dataSource.data = res.filter((cc) => cc.id);
        this.loading = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getColors() {
    this.carService.getColors().subscribe({
      next: (res) => {
        this.colors = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getColorDet(id: number) {
    return this.colors.find((c) => c.id === id);
  }

  cancel() {
    this.status = 'table';
  }

  isEdit() {
    return (
      this.selectedCar.color !== this.formGroup.get('color')?.value.id ||
      this.selectedCar.horsePower !== this.formGroup.get('horsePower')?.value ||
      this.selectedCar.price !== this.formGroup.get('price')?.value ||
      this.selectedCar.instock !== this.formGroup.get('instock')?.value
    );
  }

  onSubmit() {
    this.carService
      .setCar({
        ...this.formGroup.getRawValue(),
        color: this.formGroup.get('color')?.value.id,
      })
      .subscribe({
        next: (res) => {
          let data = [...this.dataSource.data];
          data[
            this.dataSource.data.findIndex(
              (cr) => cr.id === this.formGroup.get('id')?.value
            )
          ] = res;
          this.dataSource.data = [...data];

          this.status = 'table';
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  editData(car: Car) {
    let data = { ...car };
    if (data.instock === null) {
      data.instock = false;
    }
    const clr = data.color
      ? this.colors.find((c) => c.id === data.color)
      : this.colors[0];
    this.selectedCar = data;
    this.formGroup.setValue({ ...data, color: clr });
    this.status = 'form';
  }

  corruptData() {
    this.carService.setCar({ ...this.dataSource.data[2], instock: null }).subscribe();
    this.carService.setCar({ ...this.dataSource.data[3], horsePower: null }).subscribe();
    this.carService.setCar({ ...this.dataSource.data[4], price: null }).subscribe();
    this.carService.setCar({ ...this.dataSource.data[5], color: null }).subscribe();
    this.getCars();
  }
}
