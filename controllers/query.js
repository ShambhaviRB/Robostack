const Query = require('../models/query/schema');

exports.query_post = function (req, res, next) {
    let query = new Query(
        {
            user_id: req.body.user_id,
            question: req.body.question,
            category: req.body.category,
            tags: req.body.tags,
        }
    );

    query.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Query Posted successfully')
    })
}

exports.query_view_all = function (req, res, next) {
    Query.find(function (err, query) {
        if (err) {
            return next(err);
        }
        res.send(query);
    })
}

exports.query_answer = function (req, res, next) {
    Query.findById(req.query.id, function (err, query) {
        if (err) {
            return next(err);
        }
        query.answers.push(req.body.answers);
        query.save();
        res.send('Answer posted successfully')
    })
}

exports.query_view_by = function (req, res, next) {
    function display (property, filter) {
        Query.find(property , function (err, query) {
            if (err) {
                return next(err);
            }
            if (filter == "most_answered") {
                res.send(query.sort(function (a, b) {
                    return parseInt(b.__v) - parseInt(a.__v);
                }));
            }
            else if (filter == "recently_answered") {
                res.send(query.sort(function (a, b) {
                    return (new Date(b.answers[b.__v - 1].time_of_ans) - new Date(a.answers[a.__v - 1].time_of_ans));
                }));
            }
        })
    }
    if (req.body.category) {
        display({category:req.body.category}, req.body.filter)
    }
    else if (req.body.tags) {
        display({tags:req.body.tags}, req.body.filter)
    }
    else if (req.body.user_id) {
        display({user_id:req.body.user_id}, req.body.filter)
    }
    else {
        res.send("Error")
    }
}

exports.query_search_ques = function (req, res, next) {
    var question = req.body;
    Query.find(question, function (err, query) {
        if (err) {
            return next(err);
        }
        res.send(query);
    })
}