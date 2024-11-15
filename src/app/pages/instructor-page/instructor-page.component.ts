import { Component, OnInit } from '@angular/core';
import { InstructorService } from './instructor.service';

@Component({
  selector: 'app-instructor-page',
  templateUrl: './instructor-page.component.html',
  styleUrls: ['./instructor-page.component.css']
})
export class InstructorPageComponent implements OnInit {

  constructor(private instService: InstructorService) { }

  instructor: any[] = [];
  filterInstructor: any[] = [];
  PagesInst: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  searchTerm: string = '';
  selectedSpe: string = '';

  ngOnInit(): void {
    this.instService.getInstructors().subscribe(inst => {
      this.instructor = inst;
      this.filterInstructor = inst;
      this.updatePage();
    });
  }

  updatePage() {
    const stIdx = (this.currentPage -1) * this.itemsPerPage;
    const endIdx = stIdx + this.itemsPerPage;
    this.PagesInst = this.filterInstructor.slice(stIdx, endIdx);
  }

  filterINstructor(){
    this.filterInstructor = this.instructor.filter(inst => {
      const matchSearch = this.searchTerm ? inst.name.toLowerCase().includes(this.searchTerm.toLowerCase()): true;
      const matchSpec = this.selectedSpe ? inst.specilization === this.selectedSpe : true;
    });

    this.currentPage = 1;
    this.updatePage();
  }

  

}
