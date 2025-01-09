import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-add',
  standalone: false,
  
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    categoryId: 0,
    categoryName: ''
  };
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  addProduct(form: any): void {
    if (form.valid) {
      this.productService.addProduct(this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
