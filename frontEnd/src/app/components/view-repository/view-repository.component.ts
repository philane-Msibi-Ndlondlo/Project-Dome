import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-repository',
  templateUrl: './view-repository.component.html',
  styleUrls: ['./view-repository.component.scss']
})
export class ViewRepositoryComponent implements OnInit {

  step = 0;
  Apirepository: any = {};
  developersCount: number;
  user: any = {};
  username: any;
  constructor(private auth: AuthService, private repository: RepositoryService, private pRouter: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.auth.userData;
    this.username = this.user.firstname + ' ' + this.user.lastname;
    const repoID = this.pRouter.snapshot.params.id;
    this.repository.getApiRepository(repoID).subscribe((repo) => {
      this.Apirepository = repo.data;
      this.developersCount = this.Apirepository.apiRepoDevelopers.length;
    });
  }

  logUserout() {
    this.auth.logout();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
