"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var validation = {};
function validator(types) {
    return function (target, key) {
        var _a;
        validation[target.constructor.name] = (_a = {},
            _a[key] = types,
            _a);
    };
}
function validate(obj) {
    var validationRegistered = validation[obj.constructor.name];
    if (!validationRegistered) {
        return true;
    }
    ;
    var isvalid = true;
    for (var prop in validationRegistered) {
        for (var _i = 0, _a = validationRegistered[prop]; _i < _a.length; _i++) {
            var validator_1 = _a[_i];
            switch (validator_1) {
                case 'required':
                    isvalid = isvalid && !!obj[prop];
                    break;
                case 'password':
                    isvalid = isvalid && obj[prop].length > 5;
            }
        }
        ;
    }
    return isvalid;
}
var Person = /** @class */ (function () {
    function Person(email, password) {
        this.email = email;
        this.password = password;
    }
    __decorate([
        validator(['required'])
    ], Person.prototype, "email", void 0);
    __decorate([
        validator(['required', 'password'])
    ], Person.prototype, "password", void 0);
    return Person;
}());
var personForm = document.querySelector('form');
personForm === null || personForm === void 0 ? void 0 : personForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var emailElem = document.getElementById('email');
    var passwordElem = document.getElementById('password');
    var newPerson = new Person(emailElem.value, passwordElem.value);
    if (validate(newPerson)) {
        alert('el valor ingresado es correcto');
        return;
    }
    if (!validate(newPerson)) {
        alert('El valor ingresado no es correcto');
        return;
    }
});
