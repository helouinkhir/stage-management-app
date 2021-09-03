import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { IStage } from 'src/app/shared/interfaces/stage.interface';
import { StageService } from './../../stage.service';

@Component({
  selector: 'sm-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  load = false;

  constructor(
    private fb: FormBuilder,
    private stageService: StageService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: IStage,
    public dialogRef: MatDialogRef<EditComponent>) { }

  ngOnInit(): void {
   this.editForm = this.fb.group({
      name:  [this.data.name , Validators.required],
    });
  }

  onSubmit(): void {
    this.load = true;

    this.stageService.editStage(this.data.id , this.editForm.value.name).subscribe(

       () => {
          this.load = false;
          this.dialogRef.close(this.editForm.value.name);
       },
        err => {
          this.load = false;
          if (err.apiMsg) {
           this.toastr.error((err.apiMsg ? 'Somthing wrong' : 'Server Error'), 'Error');
         }
          this.dialogRef.close(null);
        }

      );
  }

}
