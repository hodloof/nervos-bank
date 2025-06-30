import { ccc } from "@ckb-ccc/connector-react";

export function truncateString(
  str: string,
  frontChars: number,
  endChars: number
): string {
  if (str.length <= frontChars + endChars) {
    return str;
  }
  return `${str.slice(0, frontChars)}...${str.slice(-endChars)}`;
}

export function truncateAddress(
  address: string,
  frontChars: number = 6,
  endChars: number = 4
): string {
  return truncateString(address, frontChars, endChars);
}

export function formatBalance(balanceStr: string): string {
  const num = parseFloat(balanceStr);
  if (isNaN(num)) {
    return "0.00";
  }
  return num.toFixed(2);
}

export function formatCapacity(capacityStr: string): string {
  //const str = ccc.fixedPointToString(capacityStr);
  let num = parseFloat(capacityStr);
  if (isNaN(num)) {
    return "0.00";
  }
  num = num / 100000000;
  return num.toFixed(2);
}

export function parseCapacity(capacityStr: string): number {
  //const str = ccc.fixedPointToString(capacityStr);
  let num = parseFloat(capacityStr);
  if (isNaN(num)) {
    return 0.00;
  }
  num = num / 100000000;
  return num;
}

export function formatTimestamp(milliseconds: number): string {
  if(milliseconds < 0) return "Not yet";
  const date = new Date(milliseconds);
  return date.toLocaleString();
}

export function formatTimestampStr(milliseconds: string): string {
  const date = new Date(parseInt(milliseconds));
  return date.toLocaleString();
}