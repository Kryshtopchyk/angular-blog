import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../../Interfaces/interfaces';
import {PostsService} from '../../../services/posts.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    };

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
      this.alertService.success('пост добавлен');
    });
  }
}
