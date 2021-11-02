import fs from 'fs';
import path from 'path';
import { Shipment } from './interfaces';

class DB {
  public dbPath: string;

  constructor() {
    this.dbPath = path.resolve(__dirname, '../') + '/db.json';
  }

  public read = (): Shipment[] => {
    const dbRecords = fs.readFileSync(this.dbPath);
    const parseRecords = JSON.parse(dbRecords.toString());
    return parseRecords.data;
  };

  public write = (data: Shipment[]) => {
    fs.writeFileSync(this.dbPath, JSON.stringify({ data }, null, 2));
  };
}

export default DB;
