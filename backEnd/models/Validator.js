const Joi = require('@hapi/joi');

const ValidateRegisterData = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().required().min(2).max(30).regex(/^[a-zA-Z ]*$/),
        lastname: Joi.string().required().min(2).max(30).regex(/^[a-zA-Z ]*$/),
        email: Joi.string().required().min(2).max(100).email(),
        password: Joi.string().required().min(8).max(15)
    });

    return schema.validate(data);
}

const ValidateLoginData = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().min(2).max(100).email(),
        password: Joi.string().required().min(8).max(15)
    });

    return schema.validate(data);
}

const ValidateRepoData = (data) => {
    const developers = Joi.object({
        name: Joi.string().required()
    });

    const schema = Joi.object({
        api_repository_name: Joi.string().required().min(2).max(50),
        api_repository_description: Joi.string().required().min(2).max(200),
        apiRepoDevelopers: Joi.array().items(developers),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
        category: Joi.string().required(),
        creator: Joi.string().required()
    });

    return schema.validate(data);
}

module.exports = {
    ValidateRegisterData,
    ValidateLoginData,
    ValidateRepoData
};