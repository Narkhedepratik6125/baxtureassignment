import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dataService: DataService
  ) {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['']
    });
  }

  // ngOnInit(): void {
  //   this.userForm = this.formBuilder.group({
  //     name: ['', Validators.required],
  //     lastname: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     address: this.formBuilder.group({
  //       street: ['', Validators.required],
  //       city: ['', Validators.required],
  //       zipcode: ['', Validators.required],
  //     }),
  //   });
  //   this.dataService.selectedUser$.subscribe((user) => {
  //     if (user) {
  //       this.userForm.patchValue(user);
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.dataService.selectedUser$.subscribe(user => {
      if (user) {
        this.userForm.patchValue(user);
      } else {
        this.userForm.reset();
      }
    });
  }

  // onSubmit(): void {
  //   if (this.userForm.valid) {
  //     const newUser: User = this.userForm.value;
  //     this.userService.addUser(newUser).subscribe(
  //       () => {
  //         console.log('User added successfully!');
  //         // Optionally, reset the form after successful submission
  //         this.userForm.reset();
  //       },
  //       (error) => {
  //         console.error('Error adding user:', error);
  //       }
  //     );
  //   }
  // }

  onSubmit(): void {
    const user: User = this.userForm.value;
    if (user.id) {
      this.userService.updateUser(user).subscribe(updatedUser => {
        this.dataService.setSelectedUser(updatedUser);
      });
    } else {
      this.userService.addUser(user).subscribe(newUser => {
        this.dataService.setSelectedUser(newUser);
      });
    }
  }
}
