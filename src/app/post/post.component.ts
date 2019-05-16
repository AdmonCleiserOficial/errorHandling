import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ConeccionService } from 'src/servicios/coneccion.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  titulo: string;
  imagen: string;
  articulo: string;
  video: string;

  loading: boolean = false;

  usuarioMetioDatos() {
  
    Swal.fire({
      title: 'Estas seguro/a que vas a subir este post?',
      animation: false,
      customClass: {
        popup: 'animated tada'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, estoy De Acuerdo!',
      cancelButtonText: 'No, aun necesito editar mas!',
    }).then(x=>{
      const objetoEnviar = {
        titulo: this.titulo,
        imagen:this.imagen,
        video: this.video,
        articulo: this.articulo
      }
      if (x){
        this.loading=true;
        this.conecte.enviePostBlog(objetoEnviar)
        .subscribe((data:any)=>{
          if (data){
            if (data.success){
              this.loading = false;
              Swal.fire(
                'Post Enviado',
                'Tus clientes veran tu pubblicacion en la pestaña posts',
                'success')
            } else{
              this.loading = false;
              Swal.fire(
                'Post ha fallado',
                'server problems',
                'error')
            }
          }else{
            this.loading = false;
            Swal.fire(
              'Post ha fallado',
              'No hay coneccion con el servidor',
              'error')
          }
        })
      }else{
        this.loading = false;
        Swal.fire(
          'OK',
          'corrige bien tus problemas antes de darle enviar',
          'success')

      }
    });
  }


  constructor(
    private conecte: ConeccionService
  ) { }

  ngOnInit() {
  }

}
