import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Default number of items per page
  totalItems: number = 0;
  totalPages: number = 0;
  pageSizes: number[] = [5, 10, 25, 50, 100]; // Options for page size dropdown
  searchTerm: string = ''; // For search functionality

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data; // Initialize filtered products
      this.totalItems = data.length; // Set the total number of items
      this.calculateTotalPages(); // Recalculate total pages
    });
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  updatePageSize(): void {
    this.currentPage = 1; // Reset to the first page
    this.calculateTotalPages();
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1; // Reset to the first page after filtering
    this.totalItems = this.filteredProducts.length; // Update total items
    this.calculateTotalPages(); // Recalculate total pages
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts(); // Reload products after deletion
      });
    }
  }
}
