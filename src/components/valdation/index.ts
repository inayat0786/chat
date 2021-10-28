var regexObject = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const emailValadation = (Email: string) => {
    if (Email && !regexObject.email.test(Email.replace(' ', ''))) {
        return false
    }
    else {
        return true
    }
};

export const checkPassword = (Password: string) => {
    if (Password && Password && !regularExpression.test(Password.replace(' ', ''))) {
        return false
    }
    else {
        return true
    }
};

