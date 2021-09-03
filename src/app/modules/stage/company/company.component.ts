import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { EditCompanyComponent } from './edit-company/edit-company.component';


@Component({
  selector: 'sm-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Input() company: ICompany;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editCompany(): void {
    const dialogRef = this.dialog.open(EditCompanyComponent, {
      data: {name: this.company.name, id: this.company.id}
    });

    dialogRef.afterClosed().subscribe( (newName: string) => {
     if (newName) {
       this.company.name = newName;
     }
    });
  }

}
