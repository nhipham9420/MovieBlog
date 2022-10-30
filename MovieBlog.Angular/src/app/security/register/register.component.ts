import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { SecurityService } from '../security.service';
import { userCredentials } from '../security.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  errors: string[] = [];

  ngOnInit(): void {}

  register(userCredentials: userCredentials) {
    this.errors = [];
    this.securityService.register(userCredentials).subscribe(() => {
      (authenticationResponse) =>
        this.securityService.saveToken(authenticationResponse);
      this.router.navigate(['/']),
        (error) => (this.errors = parseWebAPIErrors(error));
    });
  }
}
