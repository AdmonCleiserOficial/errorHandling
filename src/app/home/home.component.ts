import { Component, OnInit } from '@angular/core';
import { ConeccionService } from "src/servicios/coneccion.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Overlay } from '@angular/cdk/overlay';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "Kmegavisión";
  public nombre: string;
  public correo: string;
  public ciudad: string;
  public tratamiento: string;
  public mensaje: string;
  public Titulo1: string;


    // modales bootstrap
    constructor(
      private serviciobackend: ConeccionService,
      public dialog: MatDialog,
      private overlay: Overlay
    ) {
      console.log(`${2 + 2}`);
    }

    ngOnInit(){
      this.serviciobackend.getcaptionNigga().subscribe((data:any)=>{
        if (data){
          this.Titulo1 = data.msg;

        }
      });
    }

    datosMetidos() {
      const objetoParaEnviar = {
        nombre: this.nombre,
        correo: this.correo,
        ciudad: this.ciudad,
        mensaje: this.mensaje
      };
      console.log(objetoParaEnviar);
    }

    expression() {
      const objetoParaEnviar = {
        nombre: this.nombre,
        correo: this.correo,
        ciudad: this.ciudad,
        mensaje: this.mensaje
      };
      console.log(objetoParaEnviar);
    }

    openDialog(): void {

      const dialogRef = this.dialog.open(FormularioComponent,{

        width: '500px',
        maxHeight: '600px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log("The dialog was closed");
      });
    }
  

}
