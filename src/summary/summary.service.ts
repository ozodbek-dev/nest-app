import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService:ReportService) {}
  calculateSummary() {
     const totalExpence = this.reportService.getAllreports(ReportType.EXPENCE).reduce((sum, r)=> sum + r.amount,0)
    const totalIncome = this.reportService.getAllreports(ReportType.INCOME).reduce((sum, r)=> sum + r.amount,0)

    return {
      totalIncome,
      totalExpence, 
      netIncome: totalIncome-totalExpence
    }
  }
}
