import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  subscription: Subscription
  data: object = this._data.articles
  arrArticulos: object[] = [];
  id: number;
  singleArticulo: object = {};

  constructor(public _data: DataService, public _path: ActivatedRoute) {}

  ngOnInit() {

    this.id = parseInt(this._path.snapshot.params.index)

    /*
    Si el usuario entra a la web directamente
    por la URL /articulo/:id
    entonces _data.articles nunca se habrá cargado
    (ya que el usuario no ha pasado por la home).
    Por eso, si this._data.articles está vacío,
    tendremos que hacer la llamada HTTP inicial.
    */
    if (Object.entries(this.data).length === 0){
      this._data.llamadaGet("https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?language=es&q=rosalia&apiKey=afea889eae7d463b855fd2b78dc6c4c7&pageSize=6");
    }
    else {
      /* 
      De lo contrario, si el usuario entró primero a la 
      URL /home, y luego vino a /articulo/:id
      entonces _data.articles ya se habrá cargado. Y podemos sacar
      los datos del articulo de esa variable.
      */
      this.singleArticulo = this.data['articles'][this.id]
     }


    //console.log(this.data)
    this.subscription = this._data.data.subscribe(
      (newValue) => {
        this.data = newValue;
        console.log(this.data)
        this.arrArticulos = this.data["articles"];
        this.singleArticulo = this.arrArticulos[this.id];
        console.log(this.singleArticulo)
      }
    )
  }


}
