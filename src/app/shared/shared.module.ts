import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        BrowserModule, 
        CommonModule,
        MaterialModule, 
        FormsModule, 
        FlexLayoutModule
    ], 
    exports: [
        BrowserModule, 
        CommonModule,
        MaterialModule, 
        FormsModule, 
        FlexLayoutModule
    ]
})
export class SharedModule {}