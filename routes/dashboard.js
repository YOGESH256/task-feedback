import express from 'express'
const router = express.Router()
import FeedBack from '../models/feedback.js'


import   {ensureAuthenticated,forwardAuthenticated , admin}  from '../config/auth.js';
router.get('/dashboard' , (req , res) => {


    const user = req.user;

    console.log(user);

    res.render('dashboard', { user });
    
});







router.post('/dashboard' , async(req , res) => {
  const feedback = new FeedBack(req.body);
  feedback.user = req.user.id;
  await feedback.save();


  res.redirect('/dashboard');


});


router.get('/feedbacks' ,ensureAuthenticated, async(req , res) => {
  console.log(req.body);
  const user = req.user;
  const feedbacks = await FeedBack.find({user : req.user.id}).populate('user');
  res.render('viewfeedbacks' , {feedbacks, user} );
});

router.get('/' , async(req , res) => {
  res.render('register');
});



router.get('/admin', admin ,  async (req, res) => {
    
    const user = req.user;
    const feedbacks = await FeedBack.find({user : req.user.id});
    res.render('admin' , {feedbacks, user} );
})


router.post('/api/feedback', async (req, res) => {
    try {
        const feedback = new FeedBack({
            feedback: req.body.feedback,
        });

        await feedback.save();
        res.json({ success: true, feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


router.put('/api/feedback/:id', async (req, res) => {
    try {
        const feedback = await FeedBack.findByIdAndUpdate(
            req.params.id,
            { feedback: req.body.feedback },
            { new: true }
        );

        if (!feedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }

        res.json({ success: true, feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


router.delete('/api/feedback/:id', async (req, res) => {
    try {
        const feedback = await FeedBack.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});









export default router