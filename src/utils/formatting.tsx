import { formatDistanceToNow } from "date-fns";

export function formatDateToRelativeLatestOrders(timestamp: string): string {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}
