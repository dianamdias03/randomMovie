import { dadosResult } from './dadosResult.interface';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { Movie } from './movie.interface';
import { HttpClient } from '@angular/common/http';
const apiKey = 'ad55311b91063f8d17f9286cf66fa41c';
const language = 'en - US';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit, OnChanges {
  // https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg
  // https://image.tmdb.org/t/pw500/3GtHC98OXpFia0bl8GT1m9kV6IV.jpg
  movies: Movie[] = [];
  moviesRandom: Movie[] = [];
  totalMovies: number = 0;
  totalPages: number = 0;
  idMovieRandom: number = 0;
  sizeImg: string = '/w500';
  baseUrlImage: string = `https://image.tmdb.org/t/p${this.sizeImg}`;

  constructor(private httpClient: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  urlBase = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

  // , no parametro é AND e | é OU

  ngOnInit(): void {
    this.httpClient.get<dadosResult>(`${this.urlBase}`).subscribe((dados) => {
      this.movies = dados.results;
      this.totalPages = dados.total_pages;
    });
  }

  // discoveryMovies() {
  //   this.httpClient.get<dadosResult>(`${this.urlBase}`).subscribe((dados) => {
  //     this.movies = dados.results;
  //   });
  // }
  randomMovies() {
    const numberPag = Math.floor(Math.random() * (this.totalPages - 0) + 0);
    console.log(numberPag);
    this.httpClient
      .get<dadosResult>(`${this.urlBase}&page=${numberPag}`)
      .subscribe((dados) => {
        this.movies = dados.results;
        console.log(this.movies);
        this.totalMovies = this.movies.length;
        const posicaoArr = Math.floor(
          Math.random() * (this.totalMovies - 0) + 0
        );
        this.moviesRandom = [];
        this.moviesRandom.push(this.movies[posicaoArr]);
      });
    // this.listMovie();
  }
}
