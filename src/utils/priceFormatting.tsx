import BigNumber from "bignumber.js";

export const SUBSCRIPT_NUMBER_MAP: Record<number, string> = {
  4: "₄",
  5: "₅",
  6: "₆",
  7: "₇",
  8: "₈",
  9: "₉",
  10: "₁₀",
  11: "₁₁",
  12: "₁₂",
  13: "₁₃",
  14: "₁₄",
  15: "₁₅",
};

export const calcPricePrecision = (num: number) => {
  if (!num) return 8;

  switch (true) {
    case Math.abs(+num) < 0.00000000001:
      return 0;

    case Math.abs(+num) < 0.000000001:
      return 14;

    case Math.abs(+num) < 0.0000001:
      return 12;

    case Math.abs(+num) < 0.00001:
      return 10;

    case Math.abs(+num) < 0.05:
      return 6;

    case Math.abs(+num) < 1:
      return 4;

    case Math.abs(+num) < 20:
      return 3;

    default:
      return 2;
  }
};

export const formatPrice = (
  num: number | string,
  precision?: number | undefined,
  gr0 = true
): string => {
  if (!num) {
    return num.toString();
  }

  if (precision === undefined) {
    precision = calcPricePrecision(+num);
  }

  let formated = new BigNumber(num).toFormat(precision);

  if (formated.match(/^0\.[0]+$/g)) {
    formated = formated.replace(/\.[0]+$/g, "");
  }

  if (gr0) {
    const match = formated.match(/\.0{4,15}/g) as RegExpMatchArray | null;
    if (match) {
      const matchString = match[0].slice(1);
      formated = formated.replace(
        /\.0{4,15}/g,
        `.0${SUBSCRIPT_NUMBER_MAP[matchString.length]}`
      );
    }
  }

  return formated;
};
