import { Component, OnInit } from '@angular/core';
import { ConeccionService } from 'src/servicios/coneccion.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

interface Servidor {
  success: boolean;
  articulos: object;
}

interface Articulos{
  video: string;
  titulo: string;
  articulo: string;
  date: string;
  imagen: string;
}

@Component({
  selector: 'app-testeo',
  templateUrl: './testeo.component.html',
  styleUrls: ['./testeo.component.css']
})
export class TesteoComponent implements OnInit {

  public index: string = `
  <br>
<br>
<br>
<br>
<h1 >
  testeo works!
</h1  >
<p> {{msg}}</p>
<h3 class="text-center">imagen</h3>
<div
class="w-100 border d-flex justify-content-center"
>
<img 
[src]="url"
alt=""
>
</div>
  `;

  public url: string = `https://cdn.pixabay.com/photo/2016/06/05/23/56/bird-1438504__480.jpg`
  public msg: string = "mi mensaje";

  public PublicacionesAdministrador: any;
  public iframe: any;
  public arregloVacio = [];
constructor(
    private comunique: ConeccionService,
    private sanitazer: DomSanitizer
  ) {
    if (this.PublicacionesAdministrador){

      for (let i=0; i< this.PublicacionesAdministrador.length;i++ ){
        this.arregloVacio.push(this.sanitazer.bypassSecurityTrustResourceUrl(this.PublicacionesAdministrador[i].video));
      }
    }
  }
  ngOnInit() {

    this.comunique.obtengaBlog()
    .subscribe((x:Servidor)=>{

      if (x){
        if (x.success){

          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Cargado con exito de la base de datos',
            showConfirmButton: false,
            timer: 1500
          })
          this.PublicacionesAdministrador = x.articulos;
          console.log(`Mirando que me llega del servidor sii`);
          console.log(this.PublicacionesAdministrador);

          
        }

      }
    });
  }

}
