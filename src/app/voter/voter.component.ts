import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.scss']
})
export class VoterComponent implements OnInit {

  @Input()
  name: string;

  @Output()
  voted = new EventEmitter<boolean>();

  didVote = false;

  constructor() { }

  ngOnInit() {
  }

  vote(agree: boolean) {
    this.voted.emit(agree);
    this.didVote = true;
  }
}
