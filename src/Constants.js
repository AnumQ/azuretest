export const MAINPAGE_COMPONENT = {
    PROFILE: "PROFILE",
    USER_MANAGEMENT: "USER_MANAGEMENT"
}

export const MAINPAGE_STATE = {
    LOADING : "LOADING",
    MAINPAGE : "MAINPAGE",
    USER_NOT_VERIFIED: "USER_NOT_VERIFIED",
    ERROR_NO_ACCESS : "NO_ACCESS",
    ERROR_USER_DOES_NOT_EXIST_IN_FIRESTORE: "USER_DOES_NOT_EXIST_IN_FIRESTORE",
    ERROR_DATABASE_CONNECTION: "ERROR_DATABASE_CONNECTION",
    
}

export const VALIDATIONERROR = {
    SCHOOLNAME_NOT_EQUAL: "School names do not match. Please double check the spelling.",
    PASSWORDS_NOT_EQUAL: "Passwords do not match. Please doublecheck the spelling.",
    PASSWORD_MUST_CONTAIN_LOWER_CASE: "Password must contain one lower case letter",
    PASSWORD_MUST_CONTAIN_CAPITAL_CASE: "Password must contain at least one Capital letter",
    PASSWORD_MUST_CONTAIN_NUMBER: "Password must contain at least one number",
    PASSWORD_LENGTH_TOO_SHORT: "Password must be at least 5 characters",
    EMAIL_NOT_VALID: "Email is not valid"
}