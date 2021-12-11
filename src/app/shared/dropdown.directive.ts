import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    //Bind to the property value 'class' where this directrive is used
    @HostBinding('class.open') isOpen = false;
    //Listen for a 'click' event on this element
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        //Listener now checks the document instead of the dropdown, allowing the menu to close from anywhere.
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    constructor(private elRef: ElementRef) {}
}