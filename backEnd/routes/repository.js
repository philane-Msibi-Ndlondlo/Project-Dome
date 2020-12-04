const router = require("express").Router();
const { verifyToken } = require('../models/validateToken');
const { ValidateRepoData } = require('../models/Validator');
const Repository = require('../models/repository');
//verifyToken 

router.post('/', async (req, res)=>{
    
    const isValid = ValidateRepoData(req.body);

    if (isValid.error) return res.status(400).send({status: 'Error', message: isValid.error.details[0].message});

    const repo = new Repository({
        apiRepoName: req.body.api_repository_name,
        apiRepoDescription: req.body.api_repository_description,
        apiRepoDevelopers: req.body.apiRepoDevelopers,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        category: req.body.category,
        creator: req.body.creator
    });

    try {
        const savedRepo = await repo.save();
        res.send({status: 'Success', message: 'Repository Created Successfully!'});
    } catch (err) {
        return res.status(400).send({status: 'Error', message: err});
    }


});

router.get('/', async (req, res) => {
    const repos = await Repository.find({category: 'API'});
    res.send({status: 'Success', message: 'API Repositories retrived Successfully!', data: repos});
});

router.get('/:id', async (req, res) => {
    
    try {
        const repo = await Repository.findOne({_id: req.params.id});
        res.send({status: 'Success', message: 'Repository Retrived Successfully!', data: repo});
    } catch (err) {
        res.status(400).send({status: 'Error', message: 'Repository not found'});
    }
})

module.exports = router;