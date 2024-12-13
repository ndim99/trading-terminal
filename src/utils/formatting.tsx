import { formatPrice } from "./priceFormatting";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";

const numberFormatterLowDecimals = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});
const numberFormatterHighDecimals = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 8,
});
const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  notation: "compact",
});
const compactNumberFormatterNoDecimals = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
  notation: "compact",
});
const compactNumberFormatterHighDecimals = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 8,
  notation: "compact",
});

const compactNumberFormatterMid = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 5,
  notation: "compact",
});

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const currencyFormatterLong = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 5,
});
const currencyFormatterLongLong = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 8,
});
const currencyFormatter2Decimals = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
const currencyFormatterNoDecimals = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatTokenSymbol(tokenSymbol: string, maxLength: number = 10) {
  try {
    tokenSymbol = decodeURI(tokenSymbol);
  } catch {}
  if (maxLength === -1) return tokenSymbol;
  return stringShortener(tokenSymbol, maxLength);
}

export function formatTokenName(tokenName: string, length: number = 16) {
  try {
    tokenName = decodeURI(tokenName);
  } catch {}
  return stringShortener(tokenName, length);
}

export function formatHiddenEmail(str: string): string {
  const split = str.split("@");
  return `${split[0].slice(0, 2)}...@${split[1]}`;
}

export function formatHashShort(hash: string): string {
  return `${hash.slice(0, 5)}..${hash.slice(hash.length - 3)}`;
}

export function formatHash(hash: string): string {
  return `${hash.slice(0, 7)}..${hash.slice(hash.length - 5)}`;
}

export function formatWalletSelectorAddress(hash: string): string {
  return `${hash.slice(0, 4)}..${hash.slice(hash.length - 3)}`;
}

export const formatTradeConfigAmountV2 = (
  amount: string,
  tokenSymbol: string | undefined
) => {
  const absAmount = formatNumericAmountCompact(amount);
  return `${absAmount} ${
    tokenSymbol ? formatTokenSymbol(tokenSymbol) : "Unknown"
  }`;
};

export function formatNumericAmountLowDecimals(value: string): string {
  try {
    const floatValue = parseFloat(value);
    if (floatValue === 0) return value;
    if (floatValue < 0) return numberFormatterLowDecimals.format(floatValue);
    if (floatValue < 0.01) return "< 0.01";
    if (floatValue < 0.1) return value.toString().slice(0, 4);
    return numberFormatterLowDecimals.format(floatValue);
  } catch (e) {
    console.log(e);
    return "0";
  }
}

export function formatNumericAmountHighDecimals(value: string): string {
  try {
    return numberFormatterHighDecimals.format(parseFloat(value));
  } catch (e) {
    console.log(e);
    return "0";
  }
}

export function formatNumericAmountCompact(
  value: string,
  options?: { withoutDecimals?: boolean }
): string {
  try {
    const floatValue = Math.abs(parseFloat(value));
    if (floatValue === 0 || isNaN(floatValue)) return value;
    if (floatValue < 100)
      return formatPrice(floatValue, options?.withoutDecimals ? 0 : undefined);
    const formatter = options?.withoutDecimals
      ? compactNumberFormatterNoDecimals
      : compactNumberFormatter;
    return formatter.format(floatValue);
  } catch (e) {
    console.log(e);
    return "0";
  }
}

export function formatNumericAmountCompactPriceChange(
  value: string,
  options?: { withoutDecimals?: boolean }
): string {
  try {
    const floatValue = parseFloat(value);
    if (floatValue === 0 || isNaN(floatValue)) return value;
    if (floatValue < 100)
      return formatPrice(floatValue, options?.withoutDecimals ? 0 : undefined);
    const formatter = options?.withoutDecimals
      ? compactNumberFormatterNoDecimals
      : compactNumberFormatter;
    return formatter.format(floatValue);
  } catch (e) {
    console.log(e);
    return "0";
  }
}

export function formatFixedBalanceDisplay(value: string): string {
  try {
    const amountNum = Math.abs(parseFloat(value));

    if (amountNum === 0 || isNaN(amountNum)) return value;

    if (amountNum < 0.00001) {
      return "0.00001";
    } else if (amountNum < 1) {
      const numberFormatter = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 5,
      });
      return numberFormatter.format(amountNum);
    } else if (amountNum < 100) {
      const numberFormatter = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
      });
      return numberFormatter.format(amountNum);
    } else {
      return compactNumberFormatter.format(amountNum);
    }
  } catch (e) {
    console.log(e);
    return "0";
  }
}

export function formatNumberCompact(value: number): string {
  try {
    return compactNumberFormatter.format(value);
  } catch (e) {
    console.log(e);
    return "0";
  }
}

export function formatFixedPriceChangeDisplay(value: string): string {
  try {
    const amountNum = Math.abs(parseFloat(value));

    if (amountNum === 0 || isNaN(amountNum)) return value;

    if (amountNum < 0.01) {
      return "0.01";
    } else {
      const numberFormatter = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
      });
      return numberFormatter.format(amountNum);
    }
  } catch (e) {
    console.log(e);
    return "0";
  }
}

// TODO: Check where this formatter is used, and improve the functionality (make it more granular)
export function formatNumericAmountCompactHighDecimals(value: string): string {
  try {
    const floatValue = Math.abs(parseFloat(value));
    if (floatValue === 0) return value;
    if (floatValue > 0.01) return compactNumberFormatter.format(floatValue);
    return compactNumberFormatterHighDecimals.format(floatValue);
  } catch (e) {
    console.log(e);
    return "0";
  }
}

export function formatNumericAmountCompactHighDecimalsPrice(
  value: string
): string {
  try {
    const floatValue = parseFloat(value);
    if (floatValue === 0) return value;
    if (floatValue > 1) return compactNumberFormatter.format(floatValue);

    if (floatValue >= 0.01) return compactNumberFormatterMid.format(floatValue);

    return compactNumberFormatterHighDecimals.format(floatValue);
  } catch (e) {
    console.log(e);
    return "0";
  }
}

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatCurrencyLong(value: number): string {
  return currencyFormatterLong.format(value);
}

export function formatCurrencyLongLong(value: number): string {
  return currencyFormatterLongLong.format(value);
}

export function formatCurrency2Decimals(value: number): string {
  return currencyFormatter2Decimals.format(value);
}

export function formatCurrencyNoDecimals(value: number): string {
  return currencyFormatterNoDecimals.format(value);
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString("en-US", {});
}

export function formatDateV2(timestamp: number): string {
  return new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function formatDateShort(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString("en-US", {});
}

export function universalAdaptiveFormat(amount: string): string {
  const amountNum = Math.abs(parseFloat(amount));

  if (isNaN(amountNum)) return amount;

  if (amountNum < 0.00000001) {
    const numberFormatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 14,
    });
    return numberFormatter.format(amountNum);
  } else if (amountNum < 0.000001) {
    const numberFormatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 11,
    });
    return numberFormatter.format(amountNum);
  } else if (amountNum < 0.001) {
    const numberFormatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 8,
    });
    return numberFormatter.format(amountNum);
  } else if (amountNum < 1) {
    const numberFormatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 5,
    });
    return numberFormatter.format(amountNum);
  } else if (amountNum < 100) {
    const numberFormatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    });
    return numberFormatter.format(amountNum);
  } else {
    const numberFormatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    });
    return numberFormatter.format(amountNum);
  }
}

export function formatAmountForInput(amount: string): string {
  const decimals = getMaxDecimalsForAmount(amount);
  return parseFloat(amount).toFixed(decimals);
}

export function getMaxDecimalsForAmount(amount: string): number {
  const parsedAmount = parseFloat(amount);
  if (parsedAmount === 0) return 0;
  const amountNum = Math.abs(parsedAmount);

  if (isNaN(amountNum)) return 2;

  if (amountNum < 0.00000001) {
    return 14;
  } else if (amountNum < 0.000001) {
    return 11;
  } else if (amountNum < 0.001) {
    return 8;
  } else if (amountNum < 1) {
    return 5;
  } else if (amountNum < 100) {
    return 4;
  } else {
    return 4;
  }
}

export function universalAdaptiveFormatCurrency(amount: string): string {
  const amountNum = parseFloat(amount);
  if (isNaN(amountNum)) return amount;

  if (amountNum < 0.00000001) {
    const numberFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 14,
    });
    return numberFormatter.format(amountNum);
  } else if (amountNum < 0.000001) {
    const numberFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 11,
    });
    return numberFormatter.format(amountNum);
  } else if (amountNum < 0.001) {
    const numberFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 8,
    });
    return numberFormatter.format(amountNum);
  } else if (amountNum < 1) {
    const numberFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 5,
    });
    return numberFormatter.format(amountNum);
  } else if (amountNum < 100) {
    const numberFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });
    return numberFormatter.format(amountNum);
  } else {
    const numberFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return numberFormatter.format(amountNum);
  }
}

export function expiresIn(expiresAtInSec?: number | string): string {
  const parsedExpiresAtInSec = parseInt(String(expiresAtInSec));
  if (isNaN(parsedExpiresAtInSec)) return "Unknown";

  const expiresAt = new Date(parsedExpiresAtInSec * 1000).getTime();
  const currentDate = new Date().getTime();
  const timeDifferenceInMs = expiresAt - currentDate;

  if (timeDifferenceInMs <= 0) return "Expired";

  const remainingHours = Math.floor(timeDifferenceInMs / 360_000_0); // 360_000_0 is 1 hour in milliseconds

  if (remainingHours < 1) return "Less than an hour";

  return `${remainingHours} hour${remainingHours === 1 ? "" : "s"}`;
}

export function stringShortener(s: string, length: number) {
  return s.length > length ? `${s.slice(0, length)}...` : s;
}

export function formatDateToRelative(date: Date | number): string {
  return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
}
export function formatDateToRelativeOrders(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return formatDistanceToNowStrict(date, { addSuffix: true });
}
export function formatDateToRelativeLimitOrders(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return formatDistanceToNow(date, { addSuffix: true });
}
export function formatDateToRelativeLatestOrders(dateString: string): string {
  const date = new Date(dateString);
  return formatDistanceToNowStrict(date, { addSuffix: true });
}
