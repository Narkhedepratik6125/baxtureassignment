import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((users: any[]) => {
        this.users = users.map((user) => ({
          ...user,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        }));
        console.log(users);
      });
  }

  // ngOnInit(): void {
  //   this.userService.getUsers().subscribe(users => {
  //     this.users = users;
  //   });
  // }

  // deleteUser(id: number): void {
  //   this.userService.deleteUser(id);
  // }

  // deleteUser(userId: number): void {
  //   this.userService.deleteUser(userId).subscribe(
  //     () => {
  //       console.log('User deleted successfully!');
  //       // Optionally, update user list or perform other actions
  //     },
  //     (error) => {
  //       console.error('Error deleting user:', error);
  //     }
  //   );
  // }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          console.log('User deleted successfully!');
          // Optionally, update user list or perform other actions
          this.getUsers(); // Refresh the user list after deletion
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  selectUser(user: User): void {
    this.dataService.setSelectedUser(user);
  }
}
