"use strict"

let double = function (n, callback) {
    let result = 2 * n;

    if (Number.isNaN(result)) return callback("Wrong input");
    
    callback(undefined, 2 * n);
};

module.exports = double;