import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RepositoryService } from 'src/app/services/repository.service';
import { AuthService } from 'src/app/services/auth.service';

interface ICheckBoxItem {
  id?: string;
  selected: boolean;
  name: string;
}

export interface Developer {
  id: number;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-newapidialog',
  templateUrl: './newapidialog.component.html',
  styleUrls: ['./newapidialog.component.scss']
})
export class NewapidialogComponent implements OnInit {

  newApiRepoForm: FormGroup;
  DEVELOPERS: Developer[] = [
    { id: 1, name: 'Philane Msibi', selected: false},
    { id: 2, name: 'Malesa Masoma', selected: false},
    { id: 3, name: 'Kgotso Maila', selected: false},
    { id: 4, name: 'Sphelele Dumisa', selected: false},
    { id: 5, name: 'Tisetso Baloyi', selected: false}

];
  constructor(private fb: FormBuilder, private toaster: ToastrService, private repository: RepositoryService, private auth: AuthService) { }

  ngOnInit() {
    this.newApiRepoForm = this.fb.group({
      apiName: [null, Validators.required],
      description: [null, Validators.required],
      developers: new FormArray([]),
      startdate: [null, Validators.required],
      enddate: [null, Validators.required]
    });
    this.addCheckBoxes();

  }

  addCheckBoxes() {
    this.DEVELOPERS.forEach((dev, i) => {
      const control = new FormControl(i === 0);
      (this.newApiRepoForm.controls.developers as FormArray).push(control);
    });
  }


  createApiRepo(newApiRepoForm) {

    const selectedDevs = this.newApiRepoForm.value.developers
    .map((v, i) => v ? {name: this.DEVELOPERS[i].name} : null)
    .filter(v => v !== null);

    if (!newApiRepoForm.valid) {
      this.toaster.error('Please fill all fields correctly!', 'Error');
      return;
    }

    const apiRepo = {
      api_repository_name: newApiRepoForm.value.apiName,
      api_repository_description: newApiRepoForm.value.description,
      apiRepoDevelopers: selectedDevs,
      start_date: newApiRepoForm.value.startdate.toString().substring(0, 15),
      end_date: newApiRepoForm.value.enddate.toString().substring(0, 15),
      category: 'API',
      creator: this.auth.userData.email
    };

    console.log(apiRepo);
    this.repository.saveRepository(apiRepo).subscribe((response) => {
      this.toaster.success(response.message, response.status);
    }, (err) => {
      this.toaster.error(err + ' ', 'Error');
    });

  }

}
