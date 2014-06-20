var Example = {
    index: function(req, res) {
        return res.json({"msg": "testing"});
    },

    testing: function(req, res) {
        return res.json({"msg": "hopefully this can be found"});
    }
};

module.exports = Example;
