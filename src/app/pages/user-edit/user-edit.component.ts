import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/userService';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

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
  public url: any;
  public editUserForm: FormGroup = new FormGroup({});
  public fileAvatar:any;
  public imagePreview:any;

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

  // onSubmit() {
  //   const updatedUser = this.editUserForm.value;
  //   this._userService.update(this.token, this.user).subscribe(
  //     (response) => {
  //       if (response && response.status == 'success') {
  //         // creamos el msj de extito
  //         this.status = 'success';
  //         // actualizamos el identity
  //         this.identity = { ...this.identity, ...updatedUser };
  //         // seteamos los nuevos valores al localStorage
  //         this._userService.saveSession(this.identity, this.token);
  //         // recargamos la pagina
  //         this._router.navigate(['/userEdit']).then(() => {
  //           window.location.reload();
  //         });
  //       } else {
  //         this.status = 'error';
  //       }
  //     },
  //     (error) => {
  //       this.status = 'error';
  //       console.log(error);
  //     }
  //   );
  // }
  onSubmit() {
    const updatedUser = this.editUserForm.value;
    const formData = new FormData();
  
    // Agregar los datos del usuario al FormData
    formData.append('name', updatedUser.name);
    formData.append('lastname', updatedUser.lastname);
    formData.append('email', updatedUser.email);
  
    // Agregar la imagen solo si el usuario subió una nueva
    if (this.fileAvatar) {
      formData.append('image', this.fileAvatar);
    }
  
    // Llamar al servicio para actualizar el usuario con la imagen
    this._userService.update(this.token, formData).subscribe(
      (response) => {
        if (response && response.status == 'success') {
          this.status = 'success';
          // Actualizar la identidad del usuario con la nueva imagen si se subió una
          this.identity = { ...this.identity, ...updatedUser };
          if (response.user && response.user.image) {
            this.identity.image = response.user.image;
            this.user.image = response.user.image;
          }
          // Guardar los nuevos datos en el localStorage
          this._userService.saveSession(this.identity, this.token);
          // Recargar la página
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
  

  avatarUpload($event: any) {
    if($event.target.files.length > 0){
      this.fileAvatar = $event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.fileAvatar);
      reader.onloadend = () => this.imagePreview = reader.result;
    }       
  }
}
