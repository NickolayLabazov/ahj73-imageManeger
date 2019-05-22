import Gallery from './galleryclass.js';

export default class Image {
  constructor(name, url, div) {
    this.div = div;
    this.name = name;
    this.url = url;
    this.imageCont = 0;
    this.imageName = 0;
    this.imageDel = 0;
  }

  addImg() {
    const img = document.createElement('img');
    img.setAttribute('src', `https://ahj74.herokuapp.com/${this.url}`);
    this.imageCont = document.createElement('div');
    this.imageCont.appendChild(img);
    document.body.appendChild(this.imageCont);
    this.imageName = document.createElement('div');
    this.imageName.innerHTML = this.name;
    this.imageName.classList.add('name');
    this.imageCont.appendChild(this.imageName);
    this.imageCont.classList.add('imageCont');
    this.imageDel = document.createElement('div');
    this.imageDel.innerHTML = '<p>x</p>';
    this.imageCont.appendChild(this.imageDel);
    this.imageDel.classList.add('del');
    img.addEventListener('error', () => {
      document.body.removeChild(this.imageCont);
      Gallery.insertMesage(this.div.querySelector('.dropDiv'), 'Неверный URL изображения');
    });
    this.addListener();
    this.imageDel.style.cursor = 'pointer';
  }

  addListener() {
    this.imageDel.addEventListener('click', () => this.del());
  }

  async del() {
    const response = await fetch(`https://ahj74.herokuapp.com/?${this.url}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      this.imageCont.setAttribute('data-id', 'del');
      const del = document.querySelector('[data-id = del]');
      document.body.removeChild(del);
    }
  }
}
