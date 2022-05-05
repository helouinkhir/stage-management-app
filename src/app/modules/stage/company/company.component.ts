import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { EditCompanyComponent } from './edit-company/edit-company.component';

@Component({
  selector: 'sm-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent {
  @Input() company: ICompany | undefined;

  constructor(private dialog: MatDialog) { }

  editCompany(): void {
    const dialogRef = this.dialog.open(EditCompanyComponent, {
      data: { name: this.company?.name, id: this.company?.id },
    });

    dialogRef.afterClosed().subscribe((newName: string) => {
      if (newName && this.company) {
        this.company.name = newName;
      }
    });
  }
}
