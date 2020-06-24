import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../../services/posts.service';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../../Interfaces/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted = false;
  uSub: Subscription;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params.id);
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      });
    });
  }

  ngOnDestroy() {
    this.uSub.unsubscribe();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.uSub = this.postsService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,
    }).subscribe(() => {
      this.submitted = false;
      this.alertService.success('Пост обновлен');
    });
  }
}
