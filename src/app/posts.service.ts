import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import{map} from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class PostsService{
    constructor(private http:HttpClient){}

    createAndStorePosts(postData:Post){
        this.http
      .post<{name:string}>(
        'https://http-angular-firebase.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
    }

    fetchPosts(){
        return this.http.get<{[key:string]:Post}>('https://http-angular-firebase.firebaseio.com/posts.json')
        .pipe(
            map(
            responseData=>{
                let rsponseArr:Post[]=[];
                for (let r in responseData)rsponseArr.push({...responseData[r],id:r});
                return rsponseArr;
            }
            )
        );
    }

    deletePosts(){
        this.http.delete('https://http-angular-firebase.firebaseio.com/posts.json').subscribe(
            successData=>{
                console.log(successData);
            }
        );
    }
}