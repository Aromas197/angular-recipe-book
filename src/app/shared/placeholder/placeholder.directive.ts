import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
    //ViewContainerRef points to where the directive is used
    constructor(public viewContainerRef: ViewContainerRef) {}
}