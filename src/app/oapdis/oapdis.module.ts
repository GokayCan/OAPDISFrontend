import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OapdisComponent } from './oapdis.component';
import { RouterModule, Routes } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ChartModule } from 'primeng/chart';
import { CarouselModule } from 'primeng/carousel';

const routes: Routes = [
    {
        path: '',
        component: OapdisComponent
    }
]

@NgModule({
    declarations: [
        OapdisComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FullCalendarModule,
        ChartModule,
        CarouselModule
    ],
    exports: [
        OapdisComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OapdisModule { }
