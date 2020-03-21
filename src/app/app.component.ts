import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { PostsService } from "./posts.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching: boolean = false;
  errorMsg: string = null;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      returnedData => {
        this.loadedPosts = returnedData;
      },
      error => {
        this.errorMsg = error.message;
      }
    );
    this.isFetching = false;
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePosts(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.postsService.fetchPosts().subscribe(
      returnedData => {
        this.loadedPosts = returnedData;
      },
      error => {
        this.errorMsg = error.message;
      }
    );
    this.isFetching = false;
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts();
  }
}
