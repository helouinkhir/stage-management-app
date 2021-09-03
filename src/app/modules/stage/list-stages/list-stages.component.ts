import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { StageService } from './../stage.service';
import { AddComponent } from './../stage/add/add.component';
import { IStage } from 'src/app/shared/interfaces/stage.interface';
import { ICompany } from 'src/app/shared/interfaces/company.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CompanyService } from '../company.service';

@Component({
  selector: 'sm-list-stages',
  templateUrl: './list-stages.component.html',
  styleUrls: ['./list-stages.component.scss']
})
export class ListStagesComponent implements OnInit {

  stages: IStage[] = [];
  load = false;
  companies: ICompany[] = [];

  constructor(private dialog: MatDialog,
              private stageService: StageService,
              private companyService: CompanyService,
              private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.load = true;

    this.stageService.fetchStages().subscribe(
        (data: IStage[]) => {
          this.load = false;
          this.stages = data;
        },
        err => {
          this.load = false;
          if (err.apiMsg) {
           this.toastr.error((err.apiMsg ? 'Somthing wrong' : 'Server Error'), 'Error');
         }
        }
    );

    this.companyService.fetchCompanies().subscribe(
      (data: ICompany[]) => {
        this.load = false;
        this.companies = data;

        if ( this.stages.length && this.companies.length ) {
          this.stages.forEach((stage) => {
            stage.companies = this.companies.filter( c => c.stage === stage.id );
          });
         }
      },
      err => {
        this.load = false;
        if (err.apiMsg) {
         this.toastr.error((err.apiMsg ? 'Somthing wrong' : 'Server Error'), 'Error');
       }
      }
  );

  }

  addStage(): void {
    const dialogRef = this.dialog.open(AddComponent);

    dialogRef.afterClosed().subscribe( (newStage: IStage) => {
      if (newStage) {
       this.stages.push(newStage);
     }
    });
  }

  drop(event: CdkDragDrop<ICompany[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
