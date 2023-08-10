import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 as uuidv4 } from 'uuid';
import { ReportResponseDto } from 'src/dtos/report.dto';

interface ReportData {
  amount: number;
  source: string;
}
interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllreports(type: ReportType): ReportResponseDto[] {
    return data.reports
      .filter(
        (report) =>
          report.type ===
          (type === 'income' ? ReportType.INCOME : ReportType.EXPENCE),
      )
      .map((report) => new ReportResponseDto(report));
  }
  getReportById(type: string, id: string): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENCE;
    const report = data.reports
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
    if (!report) return;
    return new ReportResponseDto(report);
  }

  createReport(
    { amount, source }: ReportData,
    type: ReportType,
  ): ReportResponseDto {
    const newReport = {
      id: uuidv4(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.reports.push(newReport);
    return new ReportResponseDto(newReport);
  }
  updateReport(type: ReportType, id: string, body: UpdateReport) {
    data.reports = data.reports.map((rep) => {
      if (rep.id === id) {
        return {
          ...rep,
          type: type,
          ...body,
          updated_at: new Date(),
        };
      }
      return rep;
    });
    return {
      message: 'Updated',
    };
  }

  deleteReport(id: string) {
    data.reports = data.reports.filter((item) => item.id !== id);
    return {
      message: 'Deleted',
    };
  }
}
