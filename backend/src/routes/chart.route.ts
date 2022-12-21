import { Request, Response, Router } from 'express';
import { ChartService } from '../service/chart.service';

export const chartRouter = Router();
const chartService= new ChartService();

chartRouter.get("/chart", async (req: Request, res: Response): Promise<Response> => {
    const start = req.query.start;
    const end = req.query.end;

    const data = await chartService.getCharts(start, end);
    return res.status(200).json(data);
});
