import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NewapidialogComponent } from 'src/app/dialogs/newapidialog/newapidialog.component';
import { RepositoryService } from 'src/app/services/repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  repositories: any = [];

  constructor(private newApiDialog: MatDialog, private repository: RepositoryService, private router: Router) { }

  ngOnInit() {
    this.repository.getApiRepositories().subscribe((response) => {
      this.repositories = response;
      console.log(this.repositories);
    });
  }
  viewRepo(id: string) {
    this.router.navigate(['/repository', id]);
  }

  openNewApiDialog(): void {
    const dialogRef = this.newApiDialog.open(NewapidialogComponent, {
      width: '600px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
