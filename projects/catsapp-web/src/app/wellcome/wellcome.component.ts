import { Component } from '@angular/core';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-wellcome',
    templateUrl: './wellcome.component.html',
    styleUrls: ['./wellcome.component.scss'],
})
export class WellcomeComponent {
    link = faExternalLinkAlt;

}
