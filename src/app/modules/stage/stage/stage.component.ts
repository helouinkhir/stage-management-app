import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { EditComponent } from './edit/edit.component';
import { IStage } from '../../../shared/interfaces/stage.interface';
import { AddCompanyComponent } from '../company/add-company/add-company.component';

@Component({
  selector: 'sm-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss'],
})
export class StageComponent {
  @Input() stage: IStage | undefined;

  constructor(private dialog: MatDialog) { }

  editStage(): void {
    const dialogRef = this.dialog.open(EditComponent, {
      data: { name: this.stage?.name, id: this.stage?.id },
    });

    dialogRef.afterClosed().subscribe((newName: string) => {
      if (newName && this.stage) {
        this.stage.name = newName;
      }
    });
  }

  addCompany(): void {
    if (!this.stage?.companies) {
      this.stage.companies = [];
    }

    const dialogRef = this.dialog.open(AddCompanyComponent, {
      data: { stage: this.stage?.id },
    });

    dialogRef.afterClosed().subscribe((newCompany: ICompany) => {
      if (this.stage !== undefined && newCompany) {
        this.stage.companies.push(newCompany);
      }
    });
  }
}
