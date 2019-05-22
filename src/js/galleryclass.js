import Image from './imageclass.js';

export default class Gallery {
  constructor() {
    this.galleryForm = 0;
    this.link = 0;
    this.preview = null;
    this.dropDiv = null;
    this.formData = null;
    this.catalog = null;
  }

  async galleryCreate() {
    this.galleryForm = document.createElement('form');
    this.link = document.createElement('input');
    this.link.setAttribute('type', 'file');
    this.link.setAttribute('name', 'file');
    this.link.setAttribute('accept', 'image/*');
    document.body.appendChild(this.galleryForm);
    this.galleryForm.classList.add('galleryForm');
    this.link.classList.add('input');
    this.dropDiv = document.createElement('div');
    this.galleryForm.appendChild(this.dropDiv);
    this.dropDiv.classList.add('dropDiv');
    this.dropDiv.innerHTML = 'Drag and Drop files here or Click to select';
    this.galleryForm.appendChild(this.link);
    this.dispatchListener();
    this.inputListener();
    this.dropListener();
    this.imageFromServer();
  }

  async imageFromServer() {
    const response = await fetch('https://ahj74.herokuapp.com/?catalog', {
      method: 'GET',
    });

    if (response.ok) {
      this.catalog = JSON.parse(await response.text());
      for (const img of this.catalog) {
        if (img !== '.getkeep') {
          const image = new Image('', img, this.galleryForm);
          image.addImg();
        }
      }
    }
  }

  dispatchListener() {
    this.dropDiv.addEventListener('click', (event) => {
      event.preventDefault();
      try {
        this.removeMesage(this.dropDiv);
      } catch (e) {}
      const clickEvent = new MouseEvent('click');
	    this.link.dispatchEvent(clickEvent);
    });
  }

  dropListener() {
    this.dropDiv.addEventListener('dragover', () => {
      event.preventDefault();
      try {
        this.removeMesage(this.dropDiv);
      } catch (e) {}
    });

    this.dropDiv.addEventListener('drop', async (event) => {
      event.preventDefault();
      const files = Array.from(event.dataTransfer.files);
      this.formData = new FormData();
      this.formData.append('file', files[0]);
      this.startLoad();
    });
  }

  inputListener() {
    this.galleryForm.addEventListener('change', async (evt) => {
      evt.preventDefault();
      this.formData = new FormData(evt.currentTarget);
      this.startLoad();
    });
  }

  async startLoad() {
    const response = await fetch('https://ahj74.herokuapp.com', {
      method: 'POST',
      body: this.formData,
    });

    if (response.ok) {
      const url = await response.text();
      const img = new Image('', url, this.galleryForm);
      img.addImg();
    }
  }

  static insertMesage(div, mes) {
    const mesage = document.createElement('p');
    mesage.innerHTML = mes;
    mesage.setAttribute('id', 'mesage');
    div.appendChild(mesage);
  }

  removeMesage(parent) {
    const mes = document.querySelector('#mesage');
    if (mes != null) {
      parent.removeChild(mes);
    }
  }
}
