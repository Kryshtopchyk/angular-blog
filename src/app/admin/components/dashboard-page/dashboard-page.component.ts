import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../../../Interfaces/interfaces';
import {Subscription} from 'rxjs';
import {PostsService} from '../../../services/posts.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub: Subscription;
  rSub: Subscription;
  searchStr = '';

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string) {
    this.rSub = this.postsService.remove(id).subscribe(res => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.danger('Пост удален')
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }
}
