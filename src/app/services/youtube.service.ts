import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = ''; //Api a utilizar
  private playlist = ''; //playlist
  private nextPageToken: any;


  constructor(private http: HttpClient) { }





  getVideos() {

const url = `${this.youtubeUrl}/playlistItems`;

let parametros: any;



if (this.nextPageToken) {
   parametros = new HttpParams().set('part', 'snippet')
  .set('maxResults', '10')
  .set('playlistId', this.playlist)
  .set('pageToken', this.nextPageToken)
  .set('key', this.apiKey);
} else {
   parametros = new HttpParams().set('part', 'snippet')
  .set('maxResults', '10')
  .set('playlistId', this.playlist)
  .set('key', this.apiKey);

}







return this.http.get(url, {params: parametros}).pipe(map((resp: any) => {
  console.log(resp);
  const snippets = [];
  this.nextPageToken = resp.nextPageToken;

  for (const video of resp.items) {
    snippets.push(video.snippet);
  }
  return snippets;
}));
  }
}
