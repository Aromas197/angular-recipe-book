import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styles: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;
    collapsed = true;
    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            //Check if a user exists, and take the opposite boolean value
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        });
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

}