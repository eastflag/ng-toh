import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-dialog',
  templateUrl: './manage-dialog.component.html',
  styleUrls: ['./manage-dialog.component.scss']
})
export class ManageDialogComponent implements OnInit {
  @Input()
  name;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }
}
