import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  standalone: false,
  
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
 users: User[] = [];
  filteredUsers: User[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Default number of items per page
  totalItems: number = 0;
  totalPages: number = 0;
  pageSizes: number[] = [5, 10, 25, 50, 100]; // Options for page size dropdown
  searchTerm: string = ''; // For search functionality

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data; // Initialize filtered categories
      this.totalItems = data.length; // Set the total number of items
      this.calculateTotalPages(); // Recalculate total pages
    });
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
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

  filterUsers(): void {
    this.filteredUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1; // Reset to the first page after filtering
    this.totalItems = this.filteredUsers.length; // Update total items
    this.calculateTotalPages(); // Recalculate total pages
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this User?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers(); // Reload categories after deletion
      });
    }
  }
}
