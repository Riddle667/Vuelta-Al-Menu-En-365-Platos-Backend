const { Router} = require('express');




const router = Router();

router.get('/login', ( req = request, res = response) => {
    res.status(200).json({
        msg: 'Login'
    })
})

module.exports = router;