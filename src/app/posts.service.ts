import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
  constructor(private http: HttpClient) {}

  createAndStorePosts(postData: Post) {
    this.http
      .post<{ name: string }>(
        "https://http-angular-firebase.firebaseio.com/posts.json",
        postData,
        {
          observe: "response"
        }
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        "https://http-angular-firebase.firebaseio.com/posts.json",
        {
          headers: new HttpHeaders({
            Ip: "192.0.0.1"
          }),
          params: new HttpParams().set("print", "pretty")
        }
      )
      .pipe(
        map(responseData => {
          let rsponseArr: Post[] = [];
          for (let r in responseData)
            rsponseArr.push({ ...responseData[r], id: r });
          return rsponseArr;
        }),
        catchError(errorResponse => {
          console.log("Inside service: " + errorResponse);
          return throwError(errorResponse);
        })
      );
  }

  deletePosts() {
    this.http
      .delete("https://http-angular-firebase.firebaseio.com/posts.json")
      .subscribe(successData => {
        console.log(successData);
      });
  }
}
