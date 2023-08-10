import {v4 as uuidv4} from 'uuid';

export enum ReportType {
  INCOME = 'income',
  EXPENCE = 'expence',
}

export const data: Data = {
  reports: [
    {
      id: uuidv4(),
      source: 'test',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: uuidv4(),
      source: 'test2',
      amount: 100,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENCE,
    },
  ],
};

interface Data {
  reports: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}

data.reports.push({
  id: uuidv4(),
  source: 'test',
  amount: 100,
  created_at: new Date(),
  updated_at: new Date(),
  type: ReportType.INCOME,
});
