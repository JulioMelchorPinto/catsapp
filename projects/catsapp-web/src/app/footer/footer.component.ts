import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    facebook = faFacebook; twitter = faTwitter; whatsapp = faWhatsapp;

    constructor() { }

    ngOnInit(): void {
    }

}
