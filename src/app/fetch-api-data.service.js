"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchApiDataService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
// Declaring the API URL that will provide data for the client app
var apiUrl = 'https://fabiflix.herokuapp.com/';
var FetchApiDataService = exports.FetchApiDataService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FetchApiDataService = _classThis = /** @class */ (function () {
        function FetchApiDataService_1(http) {
            this.http = http;
        }
        /**
         *@description This is the function that makes the API call for the user registration endpoint
         * @param userDetails
         **/
        FetchApiDataService_1.prototype.userRegistration = function (userDetails) {
            console.log(userDetails);
            // post user details to the API
            return this.http.post(apiUrl + 'users', userDetails).pipe((0, operators_1.catchError)(this.handleError));
        };
        /**
         * @description This is the function that makes the API call for the user login endpoint
         * @param userDetails
         **/
        FetchApiDataService_1.prototype.userLogin = function (userDetails) {
            console.log(userDetails);
            // post user details to the API
            return this.http.post(apiUrl + 'login', userDetails).pipe((0, operators_1.catchError)(this.handleError));
        };
        // Non-typed response extraction
        FetchApiDataService_1.prototype.handleError = function (error) {
            if (error.error instanceof ErrorEvent) {
                console.error('Some error occurred:', error.error.message);
            }
            else {
                console.error("Error Status code ".concat(error.status, ", ") +
                    "Error body is: ".concat(error.error));
            }
            return (0, rxjs_1.throwError)('Something bad happened; please try again later.');
        };
        /**
         *@description This is the function that fetches all movies from the API
          * @method getAllMovies
          * @returns list of movies
          * @memberof MovieCardComponent
          * @param token
        **/
        FetchApiDataService_1.prototype.getAllMovies = function () {
            var token = localStorage.getItem('token');
            return this.http
                .get(apiUrl + 'movies', {
                headers: new http_1.HttpHeaders({
                    Authorization: 'Bearer ' + token,
                }),
            })
                .pipe((0, operators_1.map)(this.extractResponseData), (0, operators_1.catchError)(this.handleError));
        };
        /**
         * @description This is the function that fetches a single movie from the API
         * @param movieTitle
         * @returns movie object
         **/
        FetchApiDataService_1.prototype.getMovie = function (movieTitle) {
            var token = localStorage.getItem('token');
            return this.http
                .get(apiUrl + 'movies/' + movieTitle, {
                headers: new http_1.HttpHeaders({
                    Authorization: 'Bearer ' + token,
                }),
            })
                .pipe((0, operators_1.map)(this.extractResponseData), (0, operators_1.catchError)(this.handleError));
        };
        /**
         * @description This is the function that fetches a single director from the API
         * @param directorName
         * @returns director object
         * @method getDirector
         **/
        FetchApiDataService_1.prototype.getDirector = function (directorName) {
            var token = localStorage.getItem('token');
            return this.http
                .get(apiUrl + 'director/' + directorName, {
                headers: new http_1.HttpHeaders({
                    Authorization: 'Bearer ' + token,
                }),
            })
                .pipe((0, operators_1.map)(this.extractResponseData), (0, operators_1.catchError)(this.handleError));
        };
        /**
         * @description This is the function that fetches a single genre from the API
         * @param genreName
         * @returns  genre object
         * @method getGenre
         **/
        FetchApiDataService_1.prototype.getGenre = function (genreName) {
            var token = localStorage.getItem('token');
            return this.http
                .get(apiUrl + 'genre/' + genreName, {
                headers: new http_1.HttpHeaders({
                    Authorization: 'Bearer ' + token,
                }),
            })
                .pipe((0, operators_1.map)(this.extractResponseData), (0, operators_1.catchError)(this.handleError));
        };
        /**
         * @description This is the function that adds a movie to the list of favourite movies
         * @param movieId
         * @returns updated user object with new favourite movie
         * @method addFavMovie
         **/
        FetchApiDataService_1.prototype.addFavMovie = function (movieId) {
            var user = JSON.parse(localStorage.getItem('user') || '{}');
            var token = localStorage.getItem('token');
            user.FavoriteMovies.push(movieId);
            localStorage.setItem('user', JSON.stringify(user));
            return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {}, {
                headers: new http_1.HttpHeaders({
                    Authorization: 'Bearer ' + token,
                }),
            }).pipe((0, operators_1.map)(this.extractResponseData), (0, operators_1.catchError)(this.handleError));
        };
        /**
         *@description This is the function hat asks the API if a movie is in the list of favourite movies
         * @param movieId
         * @returns returns true or false
         * @method isFavMovie
         **/
        FetchApiDataService_1.prototype.isFavMovie = function (movieId) {
            var user = JSON.parse(localStorage.getItem('user') || '{}');
            return user.FavoriteMovies.indexOf(movieId) >= 0;
        };
        /**
         * @description This is the function that updates userdata in the database
         * @param updatedUser
         * @returns updated user object
         * @method editUser
         **/
        // Making the api call for the edit user endpoint
        FetchApiDataService_1.prototype.editUser = function (updatedUser) {
            var user = JSON.parse(localStorage.getItem('user') || '{}');
            var token = localStorage.getItem('token');
            return this.http.put(apiUrl + 'users/' + user.Username, updatedUser, {
                headers: new http_1.HttpHeaders({
                    Authorization: 'Bearer ' + token,
                })
            }).pipe((0, operators_1.map)(this.extractResponseData), (0, operators_1.catchError)(this.handleError));
        };
        /**
         * @description This is the function that deletes a user from the database
         * @returns user object
         * @method deleteUser
         *
         **/
        FetchApiDataService_1.prototype.deleteUser = function () {
            var user = JSON.parse(localStorage.getItem('user') || '{}');
            var token = localStorage.getItem('token');
            return this.http.delete(apiUrl + 'users/' + user.Username, {
                headers: new http_1.HttpHeaders({
                    Authorization: 'Bearer ' + token,
                }),
                responseType: "text"
            }).pipe((0, operators_1.catchError)(this.handleError));
        };
        /**
         * @description This is the function that deletes a movie from the list of favourite movies
         * @param movieId
         * @returns  updated user object
         * @method deleteFavoriteMovie
         **/
        FetchApiDataService_1.prototype.deleteFavoriteMovie = function (movieId) {
            var user = JSON.parse(localStorage.getItem('user') || '{}');
            var token = localStorage.getItem('token');
            var index = user.FavoriteMovies.indexOf(movieId);
            console.log(index);
            if (index > -1) { // only splice array when item is found
                user.FavoriteMovies.splice(index, 1); // 2nd parameter means remove one item only
            }
            localStorage.setItem('user', JSON.stringify(user));
            return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {
                headers: new http_1.HttpHeaders({
                    Authorization: 'Bearer ' + token,
                }),
                responseType: "text"
            }).pipe((0, operators_1.map)(this.extractResponseData), (0, operators_1.catchError)(this.handleError));
        };
        // Non-typed response extraction
        FetchApiDataService_1.prototype.extractResponseData = function (res) {
            var body = res;
            return body || {};
        };
        return FetchApiDataService_1;
    }());
    __setFunctionName(_classThis, "FetchApiDataService");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        FetchApiDataService = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FetchApiDataService = _classThis;
}();
