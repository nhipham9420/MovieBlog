import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { SecurityService } from '../security.service';
import { userCredentials } from '../security.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  errors: string[] = [];

  ngOnInit(): void {}
  
  login(userCredentials: userCredentials) {
    this.securityService
      .login(userCredentials)
      .subscribe((authenticationResponse) => {
        this.securityService.saveToken(authenticationResponse);
        this.router.navigate(['/']),
          (error) => (this.errors = parseWebAPIErrors(error));
      });
  }
}
