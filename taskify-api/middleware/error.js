module.exports = (req,res) => {
    res.status(404).send({
        message: 'path does not exist'
    });
}