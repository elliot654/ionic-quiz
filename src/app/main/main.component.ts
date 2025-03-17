import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, CommonModule, RouterModule, FormsModule]
})
export class MainComponent  implements OnInit, OnDestroy {
  questions:any[]=[];
  current:number=1;
  answer:number | undefined;
  score:number=0;
  showResult:boolean=false;

  constructor(private router:Router, private dataService: DataService) { 
    this.showResult=false;
    this.current =1;
    this.score=0;
  }

  ngOnInit() {
    this.dataService.getQuestions().subscribe((data)=>{
      this.questions=data;
    })
  }
  ngOnDestroy() {}

  nextQuestion() {
 
    if(this.answer==this.questions[this.current]?.answer){
      this.score++;
    }
    this.answer = undefined;
    this.current++;
  
    if(this.current >= 6){
      this.showResult=true;
    }
    
  }

}
