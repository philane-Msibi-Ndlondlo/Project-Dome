const mongoose = require('mongoose');

const developers = mongoose.Schema({
    name: {type: String, required: true}
});

const repositorySchema = mongoose.Schema({
    apiRepoName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    apiRepoDescription: {
        type: String,
        required: true,
        min: 2,
        max: 200
    },
    apiRepoDevelopers: {
        type: [developers],
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    creator: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Repositorie', repositorySchema );