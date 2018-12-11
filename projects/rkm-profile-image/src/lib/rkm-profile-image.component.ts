import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rkm-profile-image',
  template: `
    <div class="table">
      <div class="table-cell">
        <div class="modal">
          <div id="profile">
            <div class="dashes"></div>
            <label>Click to browse or drag an image here</label>
          </div>
        </div>
      </div>
    </div>
    <input type="file" id="mediaFile" />
  `,
  styleUrls: ['./rkm-profile-image.component.scss']
})
export class RkmProfileImageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
