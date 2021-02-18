const userModel = require('../model/user');

// Find a user by filter (e.g. {email: ex@ex.ex})
function Find(filter) {
    return new Promise((resolve) => {
        userModel.findOne(filter)
            .then(function (result) {
                resolve({success: true, user: result});
            }).catch(function (error) {
            resolve({success: false, error: error});
        });
    });
}

module.exports = {
    Find
}