import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'rkm-profile-image',
  template: `
    <div class="rkm-profile-container">
      <div
        class="profile"
        (click)="file.click()"
        [ngClass]="{'hasImage':hasImage}"
        [ngStyle]="{'background-image': 'url(' + thumbnail + ')'}"
      >
        <div class="dashes"></div>
        <label>Click to browse an image here</label>
      </div>
    </div>
    <input type="file" #file (change)="onFileChange($event)" style="display:none" accept="image/*" />
  `,
  styleUrls: ['./rkm-profile-image.component.scss']
})
export class RkmProfileImageComponent implements OnInit {
  uploadFile: File;
  thumbnail: any = '';
  hasImage: Boolean = false;
  fileExtensionError: Boolean = true;
  fileExtensionMessage: String = '';
  allowedExtensions = ['image/jpg', 'image/jpeg', 'image/png'];
  errors: Array<string> = [];

  @Output() upload: EventEmitter<Object> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onFileChange(event: any) {
    const files = event.target.files;
    this.uploadFile = files[0];
    this.checkFileType(this.uploadFile);
  }

  checkFileType(file: any) {
    if (this.allowedExtensions.includes(file.type)) {
      this.fileExtensionError = false;
      this.fileExtensionMessage = '';
      this.handleFiles(this.uploadFile);
    } else {
      this.errors.push('Only images are allowed.');
      this.fileExtensionError = true;
      this.upload.emit({
        error: this.errors
      });
    }
  }

  handleFiles(file: any) {
    const reader = new FileReader;
    this.readFile(file, reader, (result: any) => {
      this.hasImage = true;
      this.thumbnail = result;
      // Split the base64 string in data and contentType
      const block = result.split(';');
      // Get the content type of the image
      const contentType = block[0].split(':')[1];
      // get the real base64 content of the file
      const realData = block[1].split(',')[1];

      // Convert it to a blob to upload
      const blob = this.base64toBlob(realData, contentType, 512);
      this.upload.emit({
        file: this.uploadFile,
        fileBase64: this.thumbnail,
        fileBlob: blob
      });
    });
  }

  readFile(file: any, reader: any, callback: any) {
    reader.onload = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }

  base64toBlob(b64Data: any, contentType: any, sliceSize: any) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }
}
