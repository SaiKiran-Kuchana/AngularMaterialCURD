import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../shared/service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrl: './add-edit-emp.component.css'
})
export class AddEditEmpComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = ['Matric', 'Diploma', 'Inter', 'Btech', 'PG']

  constructor(private fb: FormBuilder, private service: ServiceService,
    private dialogref: MatDialogRef<AddEditEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      exp: '',
      package: ''
    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.service.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            alert("Employee Details Updated Successfull")
            this.dialogref.close(true)
          },
          error: (err: any) => {
            alert(err);
          }
        })
      }
      else {
        // console.log(this.empForm.value)
        this.service.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert("Employee Added Successfull")
            this.dialogref.close(true)
          },
          error: (err: any) => {
            alert(err);
          }
        })
      }

    }
  }
}
