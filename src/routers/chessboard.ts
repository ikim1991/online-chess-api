import{ Router, Request, Response } from 'express';

const router: Router = Router()

router.get('/chessboard', async (req: Request, res: Response) => {
    
    res.send('chessboard')
})

export default router;