import{ Router, Request, Response } from 'express';

const router: Router = Router()

router.get('/user', async (req: Request, res: Response) => {
    
    res.send('Users')
})

export default router;