import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// import { MatDialog } from 'angular/MatDialog';

import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService,
              UserService]
})
export class RegisterComponent implements OnInit {
    public loading = false;
    public submitted = false;
    public user: User;
    public error_msg: string;
    public items: Array<string>;

    constructor(private router: Router,
                private auth_service: AuthService,
                public user_service: UserService)
    {
    }

    ngOnInit()
    {
      this.user = new User();
      this.error_msg = "";
      this.items = this.user_service.getUserAttributes(this.user);
    }

    /**
     * @description Submit register with user information
     */
    public submitRegister(): void
    {
      this.auth_service.register(this.user).subscribe(data =>
        {
          if (data.status == 'Success')
          {
            // If registration is succesfull, navigate page to login 
            console.log("Registered");
            this.router.navigate(['/login']);
          }
          else
          {
            // Show error message if user is not registered
            this.error_msg = data.message;
            console.log(data.message);
          }
        })
    }
}