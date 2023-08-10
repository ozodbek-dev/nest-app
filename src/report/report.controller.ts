import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  ParseEnumPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { ReportService } from './report.service';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from 'src/dtos/report.dto';

@Controller('/report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENCE;
    return this.reportService.getAllreports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    console.log(typeof id);
    return new ReportResponseDto(this.reportService.getReportById(type, id));
  }

  @HttpCode(201)
  @Post()
  createReport(
    @Body()
    { amount, source }: CreateReportDto,
    @Param('type') type: string,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENCE;
    return new ReportResponseDto(
      this.reportService.createReport({ amount, source }, reportType),
    );
  }

  @HttpCode(200)
  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    body: UpdateReportDto,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENCE;
    return this.reportService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    data.reports = data.reports.filter((item) => item.id !== id);
    return {
      message: 'Deleted',
    };
  }
}
