import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
constructor(){
  console.log('loadeed me ')
}
ngOnInit(): void {
  console.log('working ')
}
}
