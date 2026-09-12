// what this file do ?
// pdf BUffer -> extract text 


import { PDFParse } from "pdf-parse";

export const extractPdfText = async (buffer: Buffer): Promise<string> => {
  const parser = new PDFParse({ data: buffer });

  const result = await parser.getText();

  await parser.destroy();

  return result.text;
};