import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: LoginService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);

        // تحديث اسم المستخدم
        this.authService.setUser(response.username);

        // الانتقال إلى صفحة الفئات
        this.router.navigate(['/categories']);
      },
      (error) => {
        this.errorMessage = 'Invalid email or password.';
      }
    );
  }
}
