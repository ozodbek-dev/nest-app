import {IsNumber, IsString, IsPositive, IsNotEmpty, IsOptional} from 'class-validator'
import { ReportType } from 'src/data';
import { Exclude, Expose } from 'class-transformer';
export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;
  @Exclude()
  created_at: Date;
  @Expose({
    name: 'createdAt',
  })
  transformCreatedAt() {
    return this.created_at;
  }

  @Exclude()
  updated_at: Date;
  transformUpdatedAt() {
    return this.updated_at;
  }
  type: ReportType;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}