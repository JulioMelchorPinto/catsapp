import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";

import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { SocialComponent } from './social/social.component';
import { GliphyService } from './services/gliphy.service';
import { GifComponent } from './gif/gif.component';
import { GameComponent } from './game/game.component';
import { FooterComponent } from './footer/footer.component';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ContentComponent,
        WellcomeComponent,
        TableComponent,
        SocialComponent,
        GifComponent,
        GameComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatSidenavModule,
        FlexLayoutModule,
        LayoutModule,
        FontAwesomeModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCardModule,
        MatGridListModule,
        MatDialogModule
    ],
    providers: [GliphyService],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
