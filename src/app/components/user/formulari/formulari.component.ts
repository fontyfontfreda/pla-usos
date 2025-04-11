import {Component, OnInit} from '@angular/core';
import {DadesUsuariComponent} from '../dades-usuari/dades-usuari.component'; // Importa el component de dades d'usuari
import {AdrecaComponent} from '../adreca/adreca.component'; // Importa el component d'adreça
import {ActivitatComponent} from '../activitat/activitat.component'; // Importa el component d'activitat
import {FormsModule} from '@angular/forms';  // Importa FormsModule
import {CommonModule} from '@angular/common'; // Afegeix CommonModule
import {RouterModule} from '@angular/router';
import {Adreca} from '../../../models/adreca.model';
import {PresentacioComponent} from '../presentacio/presentacio.component';

@Component({
  selector: 'app-formulari',
  standalone: true,
  imports: [FormsModule, CommonModule, DadesUsuariComponent, AdrecaComponent, ActivitatComponent, RouterModule, PresentacioComponent],
  templateUrl: './formulari.component.html',
  styleUrls: ['./formulari.component.css']
})
export class FormulariComponent implements OnInit {
  formPresenatcio: boolean = true;
  formDadesUsuari: boolean = false;
  formAdreca: boolean = false;
  formActivitat: boolean = false;

  selectedFile: File | null = null;

  formDataUsuari = {
    nom: '',
    dni: '',
    actuaEnNomDe: 'nomPropi'
  };

  adrecaSeleccionada: Adreca | null = null;

  activitatSeleccionada = '';

  ngOnInit() {
  }

  // Aquesta funció es crida quan es submiten la presentació
  onPresentacioSubmit() {
    this.formPresenatcio = false;
    this.formDadesUsuari = true;
  }

  // Aquesta funció es crida quan es submiten les dades de l'usuari
  onDadesUsuariSubmit(dades: any) {
    this.formDataUsuari = dades;
    console.log('Dades d\'usuari:', this.formDataUsuari);
    this.formDadesUsuari = false;
    this.formAdreca = true;
  }

  // Aquesta funció es crida quan es selecciona una adreça
  onAdrecaSubmit(adreca: Adreca | null) {
      this.adrecaSeleccionada = adreca;
      this.formAdreca = false;
      this.formActivitat = true;
  }

  // Aquesta funció es crida quan es selecciona una adreça
  onActivitatSubmit(activitat: string) {
    this.activitatSeleccionada = activitat;
    console.log('Activitat seleccionada:', this.activitatSeleccionada);
  }

  onSubmit() {
    console.log('Form Data Final:', {
      ...this.formDataUsuari,
    });
  }

  // Funció per tornar enrere al formulari de dades d'usuari
  goBack(page: number) {
    switch (page) {
      case 1:
        this.formDadesUsuari = false;
        this.formPresenatcio = true;
        break;
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
