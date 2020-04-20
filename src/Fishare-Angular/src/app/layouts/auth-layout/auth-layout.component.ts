import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
declare var VANTA: any;

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    VANTA.WAVES({
      el: '#WaveElement',
      THREE,
      waveHeight: 10,
      shininess: 75,
      waveSpeed: 0.5,
      zoom: 0.7
    });
  }
}
