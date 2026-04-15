import PasswordValidator from "password-validator"

var schema = new PasswordValidator();

// Add properties to it
schema
    .is().min(8)                                                                                                       // Minimum length 8
    .is().max(100)                                                                                                     // Maximum length 100
    .has().uppercase(1)                                                                                                // Must have at least 1 uppercase letters
    .has().lowercase(1)                                                                                                // Must have have at least 1 lowercase letters
    .has().symbols(1)                                                                                                  // Must have at least 1 special character
    .has().digits(1)                                                                                                   // Must have at least 1 digits
    .has().not().spaces()                                                                                              // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Password@123', '123@Password', 'User@123', '123@User']);            // Blacklist these values

export default function FormValidator(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
        case "email":
        case "username":
        case "question":
        case "address":
        case "pin":
        case "city":
        case "state":
        case "subject":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (value.length < 2 || value.length > 200)
                return name + " Field Length Must be 2-100 Character"
            else
                return ""

        case "message":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (value.length < 10)
                return name + " Field Length Must be Min. 10 Character"
            else
                return ""

        case "password":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (!schema.validate(value)) {
                let error = schema.validate(value, { details: true })
                return error[0]?.message ?? "Invalid Password"
            }
            else
                return ""


        case "phone":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (value.length < 10 || value.length > 10)
                return "Enter a valid Phone Number (10 digits only)"
            else if (!(value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9")))
                return "Invalid Phone Number, Phone Number Mest Start With 6,7,8 or 9"
            else
                return ""

        case "basePrice":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (parseInt(value) < 1)
                return "Base Price Must Be a Positive Value"
            else
                return ""

        case "discount":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (parseInt(value) < 0 || parseInt(value) > 100)
                return "Discount Must Be a in between 1-99"
            else
                return ""

        case "stockQuantity":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (parseInt(value) < 0)
                return "Stock Quantity Must Be a Positive Value"
            else
                return ""

        case "icon":
        case "shortDescription":
        case "answer":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else
                return ""

        default:
            return ""
    }
}