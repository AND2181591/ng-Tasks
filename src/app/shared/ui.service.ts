import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class UIService {

    appFirstTimeUse: boolean = true;

    showCurrentColor = new Subject<string>();
    private currentColor = '#673ab7';

    showTextContrast = new Subject<string>();
    private textColor = 'white';

    getContrast(hexColor: string) {
        this.currentColor = hexColor;
        if (hexColor.slice(0, 1) === '#') {
            hexColor = hexColor.slice(1);
        }
        const r = parseInt(hexColor.substr(0, 2), 16);
        const g = parseInt(hexColor.substr(2, 2), 16);
        const b = parseInt(hexColor.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

        (yiq >= 128) ? this.textColor = 'black' : this.textColor = 'white';
        this.showTextContrast.next(this.textColor);
        this.showCurrentColor.next(this.currentColor);
    }

    getTextColor() {
        return this.textColor;
    }

    resetColor() {
        this.currentColor = '#673ab7';
        this.textColor = 'white';
        this.showCurrentColor.next(this.currentColor);
        this.showTextContrast.next(this.textColor);
    }

    setFirstTimeUse() {
        this.appFirstTimeUse = false;
    }

    getFirstTimeUse() {
        return this.appFirstTimeUse;
    }
}