import{ Router, Request, Response } from 'express';

const router: Router = Router()

router.get('/game', async (req: Request, res: Response) => {
    
    res.send('game')
})

export default router;