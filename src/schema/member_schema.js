const yup = require("yup");

const memberSchema = yup.object({
    body: yup.object({
        firstName: yup.string().trim().required("Please Enter Your First Name").min(3, "First name must contain at least 3 character"),
        lastName: yup.string().trim().required("Please Enter Your Last Name").min(3),
        userName: yup.string().trim().required("Please Enter Your Username").min(3),
        email: yup.string().email("Please Enter a valid  email address"),
        password: yup
            .string()
            .required("Please Enter your password")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref("password"), null], "Passwords must match"),

        profession: yup.string().required("Please Enter Your Profession"),
        sector: yup.string().required("Please Enter Your Sector"),
        country: yup.string().required("Country Field Cannot Be Empty"),
        memberType: yup.mixed().oneOf(["free", "business", "paid"]),
    })

})

const memberLoginSchema = yup.object({
    body: yup.object({
        email: yup.string().trim().email("Please Enter a valid  email address"),
        password: yup
            .string()
            .trim()
            .required("Please Enter your password")
    })
})

module.exports = { memberSchema, memberLoginSchema }