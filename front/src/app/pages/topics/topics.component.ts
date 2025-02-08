import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { first, Observable } from 'rxjs';
import { Topic } from '../../interfaces/topic.interface';
import { TopicService } from '../../services/topic.service';
import { MddButtonComponent } from '../../components/mdd-button/mdd-button.component';
import { SubscriptionService } from '../../services/subscription.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  subscribedTopicIds!: number[];

  constructor(
    private topicService: TopicService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this.topics$ = this.topicService.getAllTopics();
    this.topicService.getSubscribedTopics()
      .pipe(first())
      .subscribe({
        next: topics => this.subscribedTopicIds = topics.map(topic => topic.id),
      });
  }

  isSubscribed(topic: Topic): boolean {
    return this.subscribedTopicIds.includes(topic.id);
  }

  clickSubscription(topic: Topic): void {
    if (this.isSubscribed(topic)) {
      this.unsubscribe(topic);
    }
    else {
      this.subscribe(topic);
    }
  }

  unsubscribe(topic: Topic): void {
    this.subscriptionService.unsubscribe(topic.id)
      .pipe(first())
      .subscribe({
        next: () => this.subscribedTopicIds = this.subscribedTopicIds.filter(id => id != topic.id),
        error: (error: HttpErrorResponse) => alert(error.message),
      })
  }

  subscribe(topic: Topic): void {
    this.subscriptionService.subscribe(topic.id)
      .pipe(first())
      .subscribe({
        next: () => this.subscribedTopicIds.push(topic.id),
        error: (error: HttpErrorResponse) => alert(error.message),
      })
  }
}
