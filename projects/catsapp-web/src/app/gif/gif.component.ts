import { Component, OnInit } from '@angular/core';
import { GliphyService } from '../services/gliphy.service';
import { DataGif } from './dataGif';
import { faFacebook, faTwitter, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

@Component({
    selector: 'app-gif',
    templateUrl: './gif.component.html',
    styleUrls: ['./gif.component.scss']
})
export class GifComponent implements OnInit {
    recip: DataGif;
    facebook = faFacebook; twitter = faTwitter; instagram = faInstagram; whatsapp = faWhatsapp;
    constructor(private giphyService: GliphyService) { }
    givemeGif() {
        this.giphyService.getGif().subscribe((data: any) => {
            this.recip = data.data;
            console.log(this.recip);
        });
    }
    async ngOnInit() {
        this.givemeGif();
    }

}
