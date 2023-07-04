import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/Users/user.service';
import { InsertUser } from 'src/app/models/UserInterface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private _userService: UserService) { }

  credentials: FormGroup = this.formBuilder.group({
    firstname: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    lastname: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    username: ["", [Validators.required, Validators.minLength(6)]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })

  ngOnInit(): void {
  }

  onSubmit(credentials: InsertUser, formGroupDirective: FormGroupDirective): void  {

    if (this.credentials.valid) {
      const form = credentials;

      let result: any;

      this._userService.createUsers(form).subscribe((result: any) => {
        if (result.status) {
          this.credentials.reset();
          formGroupDirective.resetForm();
          Swal.fire({
            title: result.message,
            icon: 'success',
            confirmButtonText: 'Okay'
          });

        } else {
          Swal.fire({
            title: result.message,
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      });


    }
  }

}
