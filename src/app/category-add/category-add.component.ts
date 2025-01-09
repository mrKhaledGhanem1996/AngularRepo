import { Component } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  standalone: false,
  
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss'
})
export class CategoryAddComponent {
  category: Category = { id: 0, name: '' };

  constructor(private categoryService: CategoryService, private router: Router) {}

  addCategory(form: any) {
    if (form.valid) {
      this.categoryService.addCategory(this.category).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    }
  }

}
