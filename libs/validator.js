const JOI = require('@hapi/joi');

userSignupValid =(input)=>{

    const schema = JOI.object({
        email: JOI.string()
            .email()
            .required(),

        password: JOI.string()
            .min(8)
            .max(35)
            .required(),

        firstName: JOI.string()
            .regex(/^[a-zA-Z*]+$/)
            .min(2)
            .max(50)
            .required(),

        lastName: JOI.string()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z*]+$/)
            .required(),

        image: JOI.string()
            .allow('',null),

        address: JOI.string()
            .required()
            .min(3)
            .max(50),

        contact: JOI.string()
            .min(5)
            .max(20),

        role: JOI.string()
            .allow('', null),
    });
    

    return new Promise((resolve,reject) => {

        const { error, value } = schema.validate(input);
        if (error)
            reject(error);
        else
            resolve(value);
    });

    //validation
};


userSigninValid = (data) => {
    const schema = JOI.object({
        email: JOI.string()
            .email()
            .required(),

        password: JOI.string()
            .min(8)
            .max(35)
            .required(),

    });

    return new Promise ((resolve, reject) => {
        const {error, value} = schema.validate(data);
        if(error) reject(error);
        else resolve(value);
    });
}

module.exports={
    userSignupValid,
    userSigninValid
};