import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  username: string | null = null;

  constructor(private authService: LoginService, private router: Router) {}

  ngOnInit(): void {
    // الاشتراك لتحديث اسم المستخدم عند تسجيل الدخول أو الخروج
    this.authService.user$.subscribe((user) => {
      this.username = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // إعادة التوجيه إلى صفحة تسجيل الدخول
  }
}
