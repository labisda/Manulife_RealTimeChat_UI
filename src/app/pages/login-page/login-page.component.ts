import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { LoginUser } from 'src/app/models/UserInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private _auth: AuthService,
              private router: Router) { }

  credentials: FormGroup = this.formBuilder.group({
    username: [""],
    password: [""]
  })

  ngOnInit(): void {
  }

  onSubmit(credentials: LoginUser) {
    this._auth.login(credentials).subscribe((result: any) => {
      console.log(result)
      if(result.isValid) {
        this._auth.userId = result.userId
        this.router.navigate(['/chat']);
      }
    })
  }

}
