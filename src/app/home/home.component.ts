import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // data:object = this._data.data;
  subscription: Subscription
  data: object = {};
  arrArticulos: object[] = [];
  busqueda: string;

  constructor(public _data: DataService) {

    this.subscription = this._data.data.subscribe(
      (newValue) => {
        this.data = newValue;
        this.arrArticulos = this.data["articles"];
        console.log(this.arrArticulos)
      }
    )

    this.busqueda = "";
    // this._data.llamadaGet("https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?language=es&from=2019-11-15&q=noticia&apiKey=afea889eae7d463b855fd2b78dc6c4c7&pageSize=12");

    if (Object.entries(this._data.articles).length === 0){
      this._data.llamadaGet("https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?language=es&from=2019-11-15&q=noticia&apiKey=afea889eae7d463b855fd2b78dc6c4c7&pageSize=12");
    } else {
      this.data = this._data.articles;
      this.arrArticulos = this.data["articles"];
    }

  }
  //HOY
  getHoy() {
    this._data.llamadaGet(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?language=es&from=2019-11-15&q=noticia&apiKey=afea889eae7d463b855fd2b78dc6c4c7&pageSize=12`);
    this.subscription = this._data.data.subscribe(
      (newValue) => {
        this.data = newValue;
        this.arrArticulos = this.data["articles"];
        console.log(this.arrArticulos)
      }
    )
  }
  //MIS CATEGORIAS
  getResistencia() {
    this.busqueda = "broncano-resistencia"
    this._data.llamadaGet(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?language=es&q=${this.busqueda}&apiKey=afea889eae7d463b855fd2b78dc6c4c7&pageSize=12`);
    this.subscription = this._data.data.subscribe(
      (newValue) => {
        this.data = newValue;
        this.arrArticulos = this.data["articles"];
        console.log(this.arrArticulos)
      }
    )
  }

  getBarca() {
    this.busqueda = "barça"
    this._data.llamadaGet(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?language=es&q=${this.busqueda}&apiKey=afea889eae7d463b855fd2b78dc6c4c7&pageSize=12`);
    this.subscription = this._data.data.subscribe(
      (newValue) => {
        this.data = newValue;
        this.arrArticulos = this.data["articles"];
        console.log(this.arrArticulos)
      }
    )
  }

  getLol() {
    this.busqueda = "league-of-legends"
    this._data.llamadaGet(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?language=es&q=${this.busqueda}&apiKey=afea889eae7d463b855fd2b78dc6c4c7&pageSize=12`);
    this.subscription = this._data.data.subscribe(
      (newValue) => {
        this.data = newValue;
        this.arrArticulos = this.data["articles"];
        console.log(this.arrArticulos)
      }
    )
  }

  //Buscar
  getBusqueda() {
    this.busqueda = (<HTMLInputElement>document.querySelector("#busqueda")).value
    this._data.llamadaGet(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?language=es&q=${this.busqueda}&apiKey=afea889eae7d463b855fd2b78dc6c4c7&pageSize=12`);
    this.subscription = this._data.data.subscribe(
      (newValue) => {
        this.data = newValue;
        this.arrArticulos = this.data["articles"];
        console.log(this.arrArticulos, this.busqueda)
      }
    )
  }


}
