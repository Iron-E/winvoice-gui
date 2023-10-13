import type { Valuators } from "../order";
import { moneyToString, type Expense, type Job } from "@/schema";

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Job}
 */
export const EXPENSE_VALUATORS: Valuators<Expense> = {
	cost: { map: moneyToString },
};
