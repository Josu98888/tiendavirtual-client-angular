import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/userService';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
// import { AngularFileUploaderConfig } from 'angular-file-uploader';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService],
})
export class UserEditComponent implements OnInit {
  public user: User;
  public identity: any;
  public status: any;
  public token: any;
  public resetVar = true;
  public url: any;
  public editUserForm: FormGroup = new FormGroup({});

  // configuracion de la libreria angular-file-update
  // public afuConfig: AngularFileUploaderConfig = {
  //   multiple: false, //para cargar un archivo a la vez
  //   formatsAllowed: '.jpg, .png, .gif, .jpeg', //extensiones disponibles
  //   maxSize: 600, //capacidad max en MB
  //   uploadAPI: {
  //     url: Global.url + 'user/upload',
  //     method: 'POST',
  //     headers: {
  //       Authorization: this._userService.getToken(),
  //     },
  //   },
  //   theme: 'attachPin', //temas disponlibles
  //   hideProgressBar: false, //oculta la barra de progreso
  //   hideResetBtn: true, //oculta el boton restablecer
  //   hideSelectBtn: false, //oculta el boton seleccionar achivo
  // };

  constructor(private _userService: UserService, private _router: Router) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = environment.url;
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.lastname,
      this.identity.email,
      this.identity.role,
      '',
      this.identity.image
    );
  }

  ngOnInit(): void {
    this.editUserForm = new FormGroup({
      name: new FormControl(this.identity.name),
      lastname: new FormControl(this.identity.lastname),
      email: new FormControl(this.identity.email),
    });
  }

  onSubmit() {
    const updatedUser = this.editUserForm.value;
    this._userService.update(this.token, this.user).subscribe(
      (response) => {
        if (response && response.status == 'success') {
          // creamos el msj de extito
          this.status = 'success';
          // actualizamos el identity
          this.identity = { ...this.identity, ...updatedUser };
          // seteamos los nuevos valores al localStorage
          this._userService.saveSession(this.identity, this.token);
          // recargamos la pagina
          this._router.navigate(['/userEdit']).then(() => {
            window.location.reload();
          });
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  avatarUpload(datos: any) {
    // Verificar si 'datos' es una cadena y convertirla a JSON si es necesario
    let data = typeof datos === 'string' ? JSON.parse(datos) : datos;

    this.user.image = data.body.image;
    this.identity.image = data.body.image;
  }
}
