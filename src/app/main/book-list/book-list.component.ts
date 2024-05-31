import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Libro } from 'src/model/Libro';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  @Input() libros: Array<Libro> = [];

  constructor() {
    this.libros = [];
  }

  filtro: string = '';

  newLibroForm = new FormGroup ({
    titulo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    autor: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    editorial: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    isbn: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{13}$')]), // [0-9]{13} -> 13 dígitos [0-9]
    anioPublicacion: new FormControl('', [Validators.required, Validators.min(1500), Validators.max(2024)]),
    estado: new FormControl('Disponible')
  })

  changeFiltro() {
    console.log(this.filtro);
  }

  onSubmit() {
    let libro: Libro = new Libro(
      this.newLibroForm.value.titulo!, 
      this.newLibroForm.value.autor!,
      this.newLibroForm.value.editorial!,
      this.newLibroForm.value.isbn!,
      Number(this.newLibroForm.value.anioPublicacion)!, 
      this.newLibroForm.value.estado!
    );
    console.log(libro);
    this.libros?.push(libro); // Agrega el libro al array de libros
    this.newLibroForm.reset(); // Resetea el formulario
  }

  get titulo() { return this.newLibroForm.controls["titulo"] }
}
