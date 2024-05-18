import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseResultsComponent } from './course-results/course-results.component';

const routes: Routes = [
  { path:"", component:CourseFormComponent },
  { path:"course-results", component:CourseResultsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
