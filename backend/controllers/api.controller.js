const getData = async (req, res) => {
    res.send('Data fetched successfully');
}

const postData = async (req, res) => {
    res.send('Data posted successfully');
}

const getDataFromImg = async (req, res) => {
    res.send('Data fetched from image successfully');
}

export { getData, postData, getDataFromImg };
