import {Component, OnInit} from '@angular/core';
import {DadesUsuariComponent} from '../dades-usuari/dades-usuari.component'; // Importa el component de dades d'usuari
import {AdrecaComponent} from '../adreca/adreca.component'; // Importa el component d'adreça
import {ActivitatComponent} from '../activitat/activitat.component'; // Importa el component d'activitat
import {FormsModule} from '@angular/forms';  // Importa FormsModule
import {CommonModule} from '@angular/common'; // Afegeix CommonModule

@Component({
  selector: 'app-formulari',
  standalone: true,
  imports: [FormsModule, CommonModule, DadesUsuariComponent, AdrecaComponent, ActivitatComponent],
  templateUrl: './formulari.component.html',
  styleUrls: ['./formulari.component.css']
})
export class FormulariComponent implements OnInit {
  formDadesUsuari: boolean = true;
  formAdreca: boolean = false;
  formActivitat: boolean = false;

  selectedFile: File | null = null;


  formDataUsuari = {
    nom: '',
    dni: '',
    actuaEnNomDe: 'nomPropi'
  };

  adrecaSeleccionada = '';
  activitatSeleccionada = '';

  ngOnInit() {
  }

  // Aquesta funció es crida quan es submiten les dades de l'usuari
  onDadesUsuariSubmit(dades: any) {
    this.formDataUsuari = dades;
    console.log('Dades d\'usuari:', this.formDataUsuari);
    this.formDadesUsuari = false;
    this.formAdreca = true;
  }

  // Aquesta funció es crida quan es selecciona una adreça
  onAdrecaSubmit(adreca: string) {
    if (adreca != '') {
      this.adrecaSeleccionada = adreca;
      console.log('Adreça seleccionada:', this.adrecaSeleccionada);
      this.formAdreca = false;
      this.formActivitat = true;
    } else
      alert("Ha de seleccionar una adreça vàlida")
  }

  // Aquesta funció es crida quan es selecciona una adreça
  onActivitatSubmit(activitat: string) {
    this.activitatSeleccionada = activitat;
    console.log('Activitat seleccionada:', this.activitatSeleccionada);
  }

  onSubmit() {
    console.log('Form Data Final:', {
      ...this.formDataUsuari,
      adreca: this.adrecaSeleccionada
    });
    // Aquí pots enviar tot a un backend si ho desitges
  }

  // Funció per tornar enrere al formulari de dades d'usuari
  goBack(page: number) {
    console.log(page)
    switch (page) {
      case 2:
        this.formDadesUsuari = true;
        this.formAdreca = false;
        break;
      case 3:
        this.formAdreca = true;
        this.formActivitat = false;
        break;
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert('Si us plau, selecciona un fitxer abans de carregar-lo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        console.log('Resposta del servidor:', data);
        alert('Fitxer carregat correctament.');
      })
      .catch(error => {
        console.error('Error carregant el fitxer:', error);
        alert('Error en carregar el fitxer.');
      });
  }
}
