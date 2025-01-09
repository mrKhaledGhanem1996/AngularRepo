import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  user: User = { id: 0, username: '', passwordHash: '', email:'' };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(id).subscribe((data: User) => {
      this.user = data;
    });
  }

  UpdateUser(form: any) {
    if(form.valid){
      this.userService.updateUser(this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }

}
