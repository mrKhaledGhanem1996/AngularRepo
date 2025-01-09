import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {
  product: Product = { id: 0, name: '', price: 0, categoryId: 0,categoryName:'' };
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.extractProductIdFromUrl();
    if (productId) {
      this.loadProduct(productId);
    }
    this.loadCategories();
  }

  extractProductIdFromUrl(): number | null {
    const urlSegments = this.router.url.split('/');
    const idSegment = urlSegments[urlSegments.length - 1];
    const productId = Number(idSegment);
    return isNaN(productId) ? null : productId;
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe((data: Product) => {
      this.product = data;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  updateProduct(form: NgForm): void {
    if (form.valid) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
