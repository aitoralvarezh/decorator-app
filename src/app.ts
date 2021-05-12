interface ValidationData {
    [className : string] : {
        [key : string] : string[]; //['required', password]
    };
}

const validation : ValidationData = {};

function validator(types: string[]) {
    return function(target : any, key : string) {
        validation[target.constructor.name] = {
            [key] : types
        }
    };
}

function validate(obj: any) {
    const validationRegistered = validation[obj.constructor.name];
    if(!validationRegistered) {
        return true;
    };
    let isvalid = true
    for(const prop in validationRegistered) {
        for(const validator of validationRegistered[prop]) {
            switch(validator) {
                case 'required' :
                    isvalid = isvalid && !!obj[prop];
                break;
                    case 'password': 
                    isvalid = isvalid && obj[prop].length > 5;
            }
    };
    }
        return isvalid;
    }

class Person {
    @validator(['required'])
    email : string;
    @validator(['required', 'password'])
    password: string;
    constructor(email : string, password : string) {
        this.email = email;
        this.password = password;
    }
}

const personForm = document.querySelector('form');

personForm?.addEventListener('submit', event => {
    event.preventDefault();
    const emailElem = document.getElementById('email') as HTMLInputElement;
    const passwordElem = document.getElementById('password') as HTMLInputElement;

    const newPerson = new Person(emailElem.value, passwordElem.value)


    if(validate(newPerson)) {
        alert('el valor ingresado es correcto')
        return;
    }
    if(!validate(newPerson)) {
        alert('El valor ingresado no es correcto')
        return;
    }
});