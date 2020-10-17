import parse from 'csv-parser';
import fs from 'fs';
import util from 'util';

async function readCSV<T>(path: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const dataArr: T[] = [];
    const parser = parse();

    fs.createReadStream(path)
      .pipe(parser)
      .on('data', (data) => {
        dataArr.push(data);
      })
      .on('end', () => {
        resolve(dataArr);
      });
  });
}

type CSVVerb = {
  intrans_no: string;
  intrans: string;
  intrans_hira: string;
  intrans_explain: string;
  trans_no: string;
  trans: string;
  trans_hira: string;
  trans_explain: string;
};

type Verb = {
  id: number;
  type: 'trans' | 'intrans';
  name: string;
  hira: string;
  explain: string;
  opposite: number;
};

(async () => {
  const result = await readCSV<CSVVerb>('src/data/data.csv');

  const verbs: Verb[] = [];

  result.forEach((verbPair) => {
    const {
      intrans,
      intrans_no,
      intrans_hira,
      intrans_explain,
      trans,
      trans_explain,
      trans_hira,
      trans_no,
    } = verbPair;

    const intransId = verbs.length;
    const transId = intransId + 1;

    const intransVerb: Verb = {
      id: intransId,
      name: intrans,
      hira: intrans_hira,
      explain: intrans_explain,
      opposite: transId,
      type: 'intrans',
    };
    const transVerb: Verb = {
      id: transId,
      name: trans,
      hira: trans_hira,
      explain: trans_explain,
      opposite: intransId,
      type: 'trans',
    };

    verbs.push(intransVerb);
    verbs.push(transVerb);
  });

  fs.writeFileSync(
    'src/data/verbs.ts',
    `export type Verb = {
  id: number;
  type: 'trans' | 'intrans';
  name: string;
  hira: string;
  explain: string;
  opposite: number;
};\n` +
      'export const verbs: Verb[] = ' +
      util.inspect(verbs, { maxArrayLength: null }),
    'utf-8'
  );
  fs.writeFileSync(
    'src/data/verbs.json',
    JSON.stringify(verbs, null, 2),
    'utf-8'
  );
})();
