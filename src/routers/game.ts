import{ Router, Request, Response } from 'express';

const router: Router = Router()

router.get('/game', async (req: Request, res: Response) => {
    
    res.send('Online Chess')
})

export default router;