import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Login(){
    this.router.navigate(["login"]);
  }
  equivalencia(){
    this.router.navigate(["solcitud"]);
  }

  consulta(){
    this.router.navigate(["consulta"]);
  }

}
