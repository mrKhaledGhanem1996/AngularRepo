import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  standalone: false,
  
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})
export class UserAddComponent {
  user: User = { id: 0, username: '',passwordHash:'', email:'' };

  constructor(private userService: UserService, private router: Router) {}

  addUser(form: any) {
    if (form.valid) {
      this.userService.createUser(this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }

}
