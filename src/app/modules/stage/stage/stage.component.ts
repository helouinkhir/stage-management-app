import { EditComponent } from './edit/edit.component';
import { IStage } from './../../../shared/interfaces/stage.interface';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyComponent } from '../company/add-company/add-company.component';
import { ICompany } from 'src/app/shared/interfaces/company.interface';

@Component({
  selector: 'sm-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  @Input() stage: IStage;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editStage(): void {
    const dialogRef = this.dialog.open(EditComponent, {
      data: {name: this.stage.name, id: this.stage.id}
    });

    dialogRef.afterClosed().subscribe( (newName: string) => {
     if (newName) {
       this.stage.name = newName;
     }
    });
  }

  addCompany(): void {

    if (!this.stage.companies) {
      this.stage.companies = [];
    }

    const dialogRef = this.dialog.open(AddCompanyComponent, {
      data : {stage: this.stage.id }
    });

    dialogRef.afterClosed().subscribe( (newCompany: ICompany) => {
     if (newCompany) {
       this.stage.companies.push(newCompany);
     }
    });
  }
}
