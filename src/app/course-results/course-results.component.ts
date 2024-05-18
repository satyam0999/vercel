import { Component, Input, OnInit } from '@angular/core';
import { CourseResultService } from '../course-result.service';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http'; 

interface Job {
  title: string;
  salary: string; 
}

function isJobArray(response: HttpResponse<any>): response is HttpResponse<Job[]> {
  return Array.isArray(response.body); 
}

@Component({
  selector: 'app-course-results',
  templateUrl: './course-results.component.html',
  styleUrls: ['./course-results.component.scss'],
})

export class CourseResultsComponent implements OnInit {
  showButton = true;
  @Input() config: any;
  @Input() formData: any;
  buttonColor = 'blue';

  showJobsPopup = false;  
  courseTitle: string;     
  universityName: string; 
  jobsData : any

  constructor(
    private courseResultService: CourseResultService,
    private router: Router,
    private http: HttpClient,
  ) {
    this.showJobsPopup = false;
    this.courseTitle = ''; 
    this.universityName = '';
  }

  ngOnInit() {
  
  }


  fetchRelatedCourses(formData: FormData) {
    
    this.http.post<any>('https://course-finder-3vxr.onrender.com/related-courses', formData)
      .subscribe(
        (response: HttpResponse<any>) => {
          console.log('Related courses:', response);
          this.config = response; 
          
        },
        (error: HttpErrorResponse) => {
          
          console.error('Failed to fetch related courses:', error);
        }
      );
      this.changeButtonColor(); 
    setTimeout(() => {
      this.hideButton();
    }, 7000); 
  }

  changeButtonColor() {
    this.buttonColor = 'grey'; 
  }
  
  getButtonColor() {
    return this.buttonColor; 
  }
  
  hideButton() {
    
    this.showButton = false;
  }
  closeJobsPopup() {
    this.jobsData = null; 
    this.showJobsPopup = false;
  }

  // scrollToTop() {
  //   window.scrollTo(0, 0);
  // }
  
  
  openJobsPopup(university:string, course: string) {
    this.showJobsPopup = true;
    this.courseTitle = course;
    this.universityName = university;
    
    
    const jobData = {
      university: university,
      course: course
    };

    this.http.post<any>('https://course-finder-3vxr.onrender.com/jobs',jobData).subscribe((response: any) => {
          if (response) {
            this.jobsData = JSON.parse(response);
          } else {
            console.error('Unexpected response format from jobs endpoint');
          }
          
        },
        (error: HttpErrorResponse) => {
          
          console.error('Failed to post job data:', error);
        }
      );
  }
}
