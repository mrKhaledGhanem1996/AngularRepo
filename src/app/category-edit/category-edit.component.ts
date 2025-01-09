import { Component } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  standalone: false,
  
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent {
  category: Category = { id: 0, name: '' };

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.categoryService.getCategoryById(id).subscribe((data: Category) => {
      this.category = data;
    });
  }

  updateCategory(form: any) {
    if(form.valid){
      this.categoryService.updateCategory(this.category).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    }
  }

}
