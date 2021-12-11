export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
        ) {}

        //getter runs code when attempting to access this property
        get token() {
            //if token doesn't exist, or the current date is newer than the expiration date, return null
            if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
                return null;
            }
            return this._token;
        }
}