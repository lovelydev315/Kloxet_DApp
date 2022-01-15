export default class CCUtil {
    static validateCreditCardNumber(ccNum) {
        const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
        const amexpRegEx = /^(?:3[47][0-9]{13})$/;
        const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
        let isValid = false;

        if (visaRegEx.test(ccNum)) {
            isValid = true;
        } else if (mastercardRegEx.test(ccNum)) {
            isValid = true;
        } else if (amexpRegEx.test(ccNum)) {
            isValid = true;
        } else if (discovRegEx.test(ccNum)) {
            isValid = true;
        }
        return isValid;
    }

    static validateCardExpiry(exMonth, exYear) {
        if(!exMonth || !exYear || (exMonth && isNaN(exMonth)) || (exYear && isNaN(exYear))) {
            return false;
        }
        var today, someday;
        today = new Date();
        someday = new Date();
        if(exMonth.length === 2 && exMonth.charAt(0) === "0"){
            exMonth = exMonth.substring(1);
        }
        someday.setFullYear(parseInt(exYear), parseInt(exMonth), 1);
        if (someday < today) {
            return false;
        } else {
            return true;
        }
    }

    static validateCardCVV (number) {
        return number && !isNaN(number);
    }
}