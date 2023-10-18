import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

export interface ILoginForm {
  usernameOrEmail: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  @ViewChild('login')
  public usernameInput: ElementRef;

  public loginForm = {} as ILoginForm;

  constructor() {}

  public ngOnInit(): void {
    setTimeout(() => {
      this.usernameInput.nativeElement.focus();
    }, 50);
  }

  public loginUser(): void {
    console.log(this.loginForm);
    this.loginForm.usernameOrEmail = '';
    this.loginForm.password = '';
  }
}
