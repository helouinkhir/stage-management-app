import { AddCompanyComponent } from './company/add-company/add-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListStagesComponent } from './list-stages/list-stages.component';
import { StageComponent } from './stage/stage.component';
import { AddComponent } from './stage/add/add.component';
import { EditComponent } from './stage/edit/edit.component';
import { CompanyComponent } from './company/company.component';
import { HttpClientModule } from '@angular/common/http';
import { EditCompanyComponent } from './company/edit-company/edit-company.component';



@NgModule({
  declarations: [
    ListStagesComponent,
    StageComponent,
    AddComponent,
    EditComponent,
    EditCompanyComponent,
    AddCompanyComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [ListStagesComponent]
})
export class StageModule { }
