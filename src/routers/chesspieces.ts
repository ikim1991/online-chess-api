import{ Router, Request, Response } from 'express';

const router: Router = Router()

router.get('/chesspieces', async (req: Request, res: Response) => {
    
    res.send('chesspieces')
})

export default router;