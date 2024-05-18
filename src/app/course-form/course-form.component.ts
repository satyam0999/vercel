import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseResultService } from '../course-result.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  angForm: FormGroup;
  courseResults: any;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseResultService: CourseResultService,
    private http: HttpClient 
  ) {
    this.angForm = this.fb.group({
      domain: ['', Validators.required],
      studyLevel: ['', Validators.required],
      degree: [''],
      test_type: [''],
      test_score: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.angForm.valid) {
      this.loading = true;
      const formData = this.angForm.value;
      this.http.post<any>('https://course-finder-3vxr.onrender.com', formData).subscribe(
        (response) => {
          console.log('Data received from Flask:', response);
          this.courseResults = response;
          this.loading = false;
        },
        (error) => {
          console.error('Error submitting form:', error);
          this.loading = false;
        }
      );
    }
  }

  onLoadSubmit(data: any) {
    console.log(data, 97);
    this.loading = true;
    let formData = {
      domain: 'data science',
      studyLevel: 'postgraduate',
    };
    this.http.post<any>('https://course-finder-3vxr.onrender.com', formData).subscribe(
      (response) => {
        console.log('Data received from Flask:', response);
        this.courseResults = response;
        this.loading = false;
      },
      (error) => {
        console.error('Error submitting form:', error);
        this.loading = false;
      }
    );
  }
}
