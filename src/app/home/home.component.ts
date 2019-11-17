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

    /******
     SUGERENCIA DE MEJORA:

     Ahora mismo, cada vez que alguien entra en la url /home
     se hace la llamada GET a la API.

     PERO, si esa persona ha entrado primero en el path /articulo/:id
     entonces la llamada GET ya se habrá hecho (ver commit anterior a este).

     Por lo tanto, el service YA tendrá la info guardada en _data.articles
     y esta llamada no será necesaria.

     CONCLUSIÓN: Al cargarse el componente, comprobamos si el data service
     ya tiene la info cargada. Si no la tiene, hacemos la llamada GET. 
     Si la tiene, cogemos los datos del service y nos ahorramos esa llamada.

    *******/
    if (Object.entries(this._data.articles).length === 0){
      this._data.llamadaGet("https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?language=es&from=2019-11-15&q=noticia&apiKey=afea889eae7d463b855fd2b78dc6c4c7&pageSize=12");
    } else {
      this.data = this._data.articles;
      this.arrArticulos = this.data["articles"];
    }

    /*
                   *
             / \
            /___\
           ( o o )            * *
           )  L  (           /   * *
   ________()(-)()________  /     * * *
 E\| _____ )()()() ______ |/B     * * *
   |/      ()()()(       \|      * * * *
           | )() |
           /     \
          / *  *  \
         /   *  *  \
        / *_  *  _  \   PUFFF 
     */



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
