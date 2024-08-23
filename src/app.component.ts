import { ChangeDetectorRef, Component } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
  LoadedImage,
} from './image-cropper/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCropperModule } from './image-cropper/image-cropper.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ImageCropperModule, FormsModule, NgIf],
})
export class App {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  myConfig = {};

  constructor(private sanitizer: DomSanitizer, private cd: ChangeDetectorRef) {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: any) {
    if (event.objectUrl) {
      console.log('image cropped');
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
        event.objectUrl
      );
      this.cd.markForCheck();
    }
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    console.log('failed');
    // show message
  }
}
