/**
 * @desc creatinf a new short URL and handle the logic of validating the long URL and checking it   it exists and generating short code 
 * @route POST /api/shorten
 * @access Public
 */

const shortenUrl = async(req,res) =>{
    const {longUrl} = req.body; // same as const longUrl = req.body.longUrl;

    console.log('Recieve long URL',longUrl);

    if(!longUrl){
        return res.status(400).json({success:false,error:'Please provide a URL'});
    }
    res.status(200).json({ success: true, message: 'Controller is now connected!', data: { receivedUrl: longUrl } });
}

module.exports ={
    shortenUrl,
}