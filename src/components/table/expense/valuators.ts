import type { Valuators } from "../order";
import { moneyToString, type Expense, type Job } from "@/schema";

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Job}
 */
export function expenseValuators(): Valuators<Expense> {
	return {
		cost: { map: moneyToString },
	};
}
