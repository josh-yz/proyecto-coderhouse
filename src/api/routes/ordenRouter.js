const express = require('express');
const router = express.Router();

const {
    getOrden,
    getOrdenId,
    postOrden,
    putOrden,
    deleteOrden
} = require('../controllers/ordenConteoller');
//const auth = require('../middlewares/auth');

router.get('/',getOrden); 
router.get('/:id',getOrdenId); 
router.post('/:id',postOrden); 
router.put('/:id',putOrden); 
router.delete('/:id',deleteOrden); 

module.exports = router;