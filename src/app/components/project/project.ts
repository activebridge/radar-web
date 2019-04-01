import { Component, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../utility/notification.service';
import { DeleteConfirm } from '../shared/delete-confirm/delete-confirm';

import { ProjectAPI } from '../../api';

@Component({
  selector: 'app-project',
  templateUrl: './project.html'
})

export class Project implements OnInit {
  project: any = {};

  constructor(private projectAPI: ProjectAPI,
              private modalService: BsModalService,
              private router: ActivatedRoute,
              private redirect: Router,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params.id) {
        this.getProject(params.id);
      }
    });
  }

  getProject(id) {
    this.projectAPI.get(id).subscribe(this.onGetSuccess, this.onGetError);
  }

  deleteProject() {
    this.projectAPI.delete(this.project.id)
                   .subscribe(this.onDeleteSuccess, this.notifyService.showError);
  }

  confirmDelete() {
    const modal = this.modalService.show(DeleteConfirm, {class: 'modal-lg', backdrop: true});
    modal.content.projectName = this.project.name;
    modal.content.onClose.subscribe((result) => {
      if (result) {
        this.deleteProject();
      }
    });
  }

  private onGetSuccess = (resp) => {
    this.project = resp.data.attributes;
  }

  private onGetError = (error) => {
    this.notifyService.showError(error);
    this.redirect.navigate(['dashboard']);
  }

  private onDeleteSuccess = (resp) => {
    this.notifyService.showSuccess(`${this.project.name} was destroyed`);
    this.redirect.navigate(['dashboard']);
  }
}
