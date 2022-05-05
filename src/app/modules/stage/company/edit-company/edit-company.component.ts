import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'sm-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
})
export class EditCompanyComponent implements OnInit {
  load = false;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private editForm: FormGroup,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: ICompany,
    public dialogRef: MatDialogRef<EditCompanyComponent>,
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.data.name, Validators.required],
    });
  }

  onSubmit(): void {
    this.load = true;
    this.companyService.editCompany(this.data.id, this.editForm.value.name).subscribe(
      () => {
        this.load = false;
        this.dialogRef.close(this.editForm.value.name);
      },
      (err) => {
        this.load = false;
        if (err.apiMsg) {
          this.toastr.error((err.apiMsg ? 'Somthing wrong' : 'Server Error'), 'Error');
        }
        this.dialogRef.close(null);
      },
    );
  }
}
