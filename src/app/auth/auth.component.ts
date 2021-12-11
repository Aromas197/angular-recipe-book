import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    private closeSub: Subscription;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        this.isLoading = true;
        if(!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        //This observable will always have a value to subscribe to, and it will still manage the loading
        //state and error handling regardless of output, so the observable can just be set in the if condition
        //and then it can be subscribed to afterwards.
        let authObs: Observable<AuthResponseData>;

        if(this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
            this.router.navigate(['./recipes']);
        },
        errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
        }
        );

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    //Creates an AlertComponent from inside code
    private showErrorAlert(message: string) {
        //Creates a component factory for building AlertComponent
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
            AlertComponent
        );
        //Get ViewContainerRef from the ViewChild object
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        //Creates a new component in place of the ViewContainerRef
        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
        //Instance has the properties of the component
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy() {
        if(this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }
}