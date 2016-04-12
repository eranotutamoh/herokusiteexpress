module.exports.index = function (req, res) {
    res.render('index', { title: 'Jonathan Pierce' });
};

module.exports.git = function (req, res) {
    res.render('code/git', { title: 'GIT Commands' });
};
