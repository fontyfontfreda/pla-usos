import {Component, OnInit} from '@angular/core';
import {DadesUsuariComponent} from '../dades-usuari/dades-usuari.component'; // Importa el component de dades d'usuari
import {AdrecaComponent} from '../adreca/adreca.component'; // Importa el component d'adreça
import {ActivitatComponent} from '../activitat/activitat.component'; // Importa el component d'activitat
import {FormsModule} from '@angular/forms';  // Importa FormsModule
import {CommonModule} from '@angular/common'; // Afegeix CommonModule
import {RouterModule} from '@angular/router';
import {Adreca} from '../../../models/adreca.model';
import {PresentacioComponent} from '../presentacio/presentacio.component';
import {Activitat} from '../../../models/activitat.model';
import {ActivitatService} from '../../../services/activitat.service';
import {MantenimentService} from '../../../services/manteniment.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NotificacioComponent} from '../../shared/notificacio/notificacio.component';

@Component({
  selector: 'app-formulari',
  standalone: true,
  imports: [FormsModule, CommonModule, DadesUsuariComponent, AdrecaComponent, ActivitatComponent, RouterModule, PresentacioComponent, MatProgressSpinnerModule, NotificacioComponent],
  templateUrl: './formulari.component.html',
  styleUrls: ['./formulari.component.css']
})
export class FormulariComponent implements OnInit {
  formPresenatcio: boolean = true;
  formDadesUsuari: boolean = false;
  formAdreca: boolean = false;
  formActivitat: boolean = false;
  generantPDF: boolean = false;
  dialogAltres: boolean = false;
  dialogCondicio: boolean = false;
  isCondicio: boolean = false;

  textNoti: string = '';
  tipusNoti: 'error' | 'ok' | 'info' = 'info';

  selectedFile: File | null = null;

  formDataUsuari = {
    nom: '',
    dni: '',
    actuaEnNomDe: 'nomPropi'
  };

  correu: string = 'espaicooperatiu@olot.cat'
  correuCondicio: string = 'aculebras@consorcisigma.org'

  adrecaSeleccionada: Adreca | null = null;

  activitatSeleccionada: Activitat | null = null;

  constructor(private activitatService: ActivitatService, private mantenimentService: MantenimentService) {
  }

  async ngOnInit() {
    await this.mantenimentService.health();
  }

  // Aquesta funció es crida quan es submiten la presentació
  onPresentacioSubmit() {
    this.formPresenatcio = false;
    this.formDadesUsuari = true;
  }

  // Aquesta funció es crida quan es submiten les dades de l'usuari
  onDadesUsuariSubmit(dades: any) {
    this.formDataUsuari = dades;
    this.formDadesUsuari = false;
    this.formAdreca = true;
  }

  // Aquesta funció es crida quan es selecciona una adreça
  onAdrecaSubmit(adreca: Adreca | null) {
    this.adrecaSeleccionada = adreca;
    this.formAdreca = false;
    this.formActivitat = true;
  }

  // Aquesta funció es crida quan es selecciona una activitat
  onActivitatSubmit(activitat: Activitat) {
    this.activitatSeleccionada = activitat;
    if (activitat.is_altres) {
      this.dialogAltres = true;
    } else {
      if (!(activitat.id_condicio == 1 || activitat.id_condicio == 2 || activitat.id_condicio == 3)) {
        this.isCondicio = true;
        this.dialogCondicio = true;
      }
      this.generarPDF();
    }
  }

  generarPDF() {
    this.dialogCondicio = false;
    this.generantPDF = true;

    this.activitatService.sendActivitat({
      usuari: this.formDataUsuari,
      adreca: this.adrecaSeleccionada,
      activitat: this.activitatSeleccionada
    })
      .then(({blob, is_apte}) => {
        this.generantPDF = false;

        const fileURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = 'informe_final.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(fileURL); // Bona pràctica: netejar URL temporal

        this.textNoti = `Dades enviades correctament i el fitxer s'ha descarregat.`;
        this.tipusNoti = 'ok';
        this.timeOutNoti();
        if (this.isCondicio && is_apte)
          this.dialogCondicio = true;
      })
      .catch(error => {
        this.generantPDF = false;
        console.log(error)

        if (error.response && error.response.data) {
          this.textNoti = error.response.data;
        } else {
          this.textNoti = "S'ha produït un error a l'enviar les dades.";
        }

        this.tipusNoti = 'error';
        this.timeOutNoti();
      });
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

  private timeOutNoti() {
    setTimeout(() => {
      this.textNoti = '';
    }, 2500);
  }
}
