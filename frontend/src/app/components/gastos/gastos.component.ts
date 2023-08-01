import { Component } from '@angular/core';
import { Gasto } from 'src/app/models/gasto';
import { GastoService } from 'src/app/services/gasto.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent {

  constructor(protected gastoService: GastoService) { }

  ngOnInit(): void {
    this.getGastos();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.gastoService.selectedGasto = new Gasto();
    }
  }

  addGasto(form: NgForm) {
    this.gastoService.postGasto(form.value)
      .subscribe(res => {
        console.log(res);
        this.resetForm(form);
        this.getGastos();
        //M.toast({ html: 'Gasto Guardado' });
      })
  }

  getGastos() {
    this.gastoService.getGastos().subscribe(res => {
        this.gastoService.gastos = res as Gasto[];
        console.log(res);
      })
  }

  editGasto(form: NgForm) {
    this.gastoService.putGasto(this.gastoService.selectedGasto).subscribe(res => {
      console.log(res);
      this.resetForm(form);
      this.getGastos(); // Update the gastos list after editing a gasto.
    })
  }

  editGastoForm(gasto: Gasto) {
    this.gastoService.selectedGasto = { ...gasto };
  }

  deleteGasto(gastoId: string) {
    if (confirm('¿Está seguro de que desea eliminar este gasto?')) {
      this.gastoService.deleteGasto(gastoId).subscribe(() => {
        this.gastoService.getGastos().subscribe(res => {
          this.gastoService.gastos = res as Gasto[];
          console.log(res);
        })
      });
    }
  }
}
