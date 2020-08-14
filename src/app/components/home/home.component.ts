import { Component, OnInit, TemplateRef } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videoSel: any;

  modalRef: BsModalRef;


  videos: [] = [];

  constructor(public yts: YoutubeService,
              private modalService: BsModalService) {
    yts.getVideos().subscribe((resp: any) => {
      this.videos = resp;
    });
   }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>, video) {
    this.modalRef = this.modalService.show(template);
    this.videoSel = video;
  }

  cargarMas() {
    this.yts.getVideos().subscribe((resp: any) => {
     this.videos.push.apply(this.videos, resp);
    });
  }

}
