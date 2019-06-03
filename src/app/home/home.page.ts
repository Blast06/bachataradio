import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOptsTop = {
    spaceBetween: 0,
    slidesPerView: 1.15,
  };
  /*
    slider with more narrow cards, 2 fully visible slides
  */
  slideOptsThumbs = {
    spaceBetween: 0,
    slidesPerView: 2.65,
  };

  emisoras: Observable<any[]>;

  categoria = 'regiones';

  categorias: Observable<any[]>;

  constructor( public afDB: AngularFireDatabase ) {

    this.categorias = afDB.list('categorias').valueChanges();

    this.emisoras = afDB.list(this.categoria).valueChanges();
    console.log('this.emisora :', this.emisoras);
    this.emisoras.subscribe( (data: any) => {
      console.log(data);
    });
  }


  cambiar( category: any ) {

    console.log('category :', category);
    this.emisoras = this.afDB.list(category.nombre).valueChanges();

  }

  /*
    ---
    fullsiz'isch slider
    ---
    spaceBetween: 0 <- Spacing is made trough ion-cards margin
    slidesPerView: 1.15 <- Amount of visible Slides, or in our example: Cards

    You may check different Breakpoint sizes
    but thanks to Swiper slider this is easy as well.

    breakpointsInverse: {
      // when window width is <= 320px
      320: {
        slidesPerView: 1.2,
      },
      // when window width is <= 480px
      480: {
        slidesPerView: 1.3,
      },
      // when window width is <= 640px
      640: {
        slidesPerView: 1.75,
      }
   }

    ! Check the Docu for more awesome stuff: http://idangero.us/swiper/api/

  */
}
