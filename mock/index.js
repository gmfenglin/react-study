const proxy = {
    'GET /api/user': {
        id: 1,
        username: 'good',
        sex: 6
    },
    'GET /api/user/list': [
        {
            id: 2,
            username: 'study',
            sex: 5
        },
        {
            id: 3,
            username: 'jake',
            sex: 4
        }
    ],
    'POST /api/user/manager': (req, res) => {
        console.log('-----' + req.body);
        res.send({status: 'ok', message: '删除成功'});
    }
};
module.exports = proxy;