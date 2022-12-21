import { Op } from "sequelize";
import { Chart } from "../model/chart.model";


export class ChartService {
    constructor() {}

    async getCharts(start: any, end: any) {
        try {
            const charts: Chart[] = await Chart.findAll({
                where: {
                    month: {
                        [Op.lte]: end ? end : 10000,
                        [Op.gte]: start ? start : 0
                      }
                }
            });
            return {hasError: false, data: charts};
        } catch (err) {
            return {hasError: true, error: err, message: "Failed to get all chart data."};
        }
    }

};
