import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ICompany } from '../../../../shared/interfaces/company.interface';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'sm-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  load = false;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private addForm: FormGroup,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      companyId: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.load = true;

    this.companyService
      .addCompany(this.data.stage, this.addForm.value.name, this.addForm.value.companyId)
      .subscribe(
        (data: ICompany) => {
          this.load = false;
          this.dialogRef.close(data);
        },
        (err) => {
          this.load = false;
          if (err.apiMsg) {
            this.toastr.error((err.apiMsg ? 'Something wrong' : 'Server Error'), 'Error');
          }
          this.dialogRef.close(null);
        },

      );
  }
}
