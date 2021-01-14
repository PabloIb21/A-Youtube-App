import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey     = 'AIzaSyB-edYuKh3oPbFMda8rAixy2NTbq6Uo_Sw';
  private playlist   = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor( private http: HttpClient ) { }

  getVideos() {

    const url = `${ this.youtubeUrl }/playlistItems`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '9')
      .set('playlistId', this.playlist)
      .set('key', this.apiKey)
      .set('pageToken', this.nextPageToken);

    return this.http.get<YoutubeResponse>( url, { params })
            .pipe(

              map( res => {
                this.nextPageToken = res.nextPageToken;
                return res.items;
              }),

              map( items => items.map( video => video.snippet ) )

            );

  }


}
