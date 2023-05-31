import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  imports: [RouterOutlet],
  standalone: true,
})
export class BodyComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
