import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Topic } from '../../interfaces/topic.interface';
import { TopicService } from '../../services/topic.service';
import { MddButtonComponent } from '../../components/mdd-button/mdd-button.component';

@Component({
  selector: 'app-themes',
  imports: [
    NavbarComponent,
    CommonModule,
    AsyncPipe,
    MddButtonComponent,
  ],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent implements OnInit {

  topics$!: Observable<Topic[]>;

  constructor(
    private topicService: TopicService,
  ) { }

  ngOnInit(): void {
    this.topics$ = this.topicService.getAllTopics();
  }

  subscribe(topic: Topic) { }
}
