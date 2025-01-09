import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-category-list',
  standalone: false,
  
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})


export class CategoryListComponent implements OnInit{
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Default number of items per page
  totalItems: number = 0;
  totalPages: number = 0;
  pageSizes: number[] = [5, 10, 25, 50, 100]; // Options for page size dropdown
  searchTerm: string = ''; // For search functionality

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      this.filteredCategories = data; // Initialize filtered categories
      this.totalItems = data.length; // Set the total number of items
      this.calculateTotalPages(); // Recalculate total pages
    });
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  get paginatedCategories(): Category[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredCategories.slice(startIndex, startIndex + this.pageSize);
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

  filterCategories(): void {
    this.filteredCategories = this.categories.filter((category) =>
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1; // Reset to the first page after filtering
    this.totalItems = this.filteredCategories.length; // Update total items
    this.calculateTotalPages(); // Recalculate total pages
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories(); // Reload categories after deletion
      });
    }
  }
}
