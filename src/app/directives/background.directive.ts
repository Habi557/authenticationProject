import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective {

  constructor(private element : ElementRef) {
    this.element.nativeElement.style.backgroundColor = "red";

   }


}
