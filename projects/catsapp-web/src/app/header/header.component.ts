import { Component, Input } from '@angular/core';
import { faCat, faEllipsisV, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() deviceXs: boolean;
    cat = faCat; dots = faEllipsisV; lang = faGlobe;
    constructor(
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer
    ) {
        iconRegistry.addSvgIcon('en', sanitizer.bypassSecurityTrustResourceUrl('assets/flags/en.svg'));
        iconRegistry.addSvgIcon('es', sanitizer.bypassSecurityTrustResourceUrl('assets/flags/es.svg'));
    }
}
