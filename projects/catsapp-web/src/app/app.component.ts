import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Catsapp';
    mediaSub: Subscription;
    deviceXs: boolean;
    deviceSm: boolean;
    deviceMd: boolean;
    deviceLg: boolean;
    constructor(public mediaObserver: MediaObserver) { }
    // Http Headers

    ngOnInit() {
        this.mediaSub = this.mediaObserver.media$
            .subscribe((result: MediaChange) => {
                console.log(result.mqAlias);
                this.deviceXs = result.mqAlias === 'xs' ? true : false;
                this.deviceSm = result.mqAlias === 'sm' ? true : false;
                this.deviceMd = result.mqAlias === 'md' ? true : false;
                this.deviceLg = result.mqAlias === 'lg' ? true : false;
            });
    }
    ngOnDestroy() { this.mediaSub.unsubscribe() }
}
