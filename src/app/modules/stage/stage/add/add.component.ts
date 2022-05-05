import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { StageService } from '../../stage.service';

@Component({
  selector: 'sm-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  addForm: FormGroup;

  load = false;

  constructor(
    private fb: FormBuilder,
    private stageService: StageService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddComponent>,
  ) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.load = true;

    this.stageService.addStage(this.addForm.value.name).subscribe(

      (data) => {
        this.load = false;
        this.dialogRef.close(data);
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
