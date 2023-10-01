import type { Job } from "@/schema";
import { type UseOrder, useOrder } from "../order";

/** @returns {@link useOrder} specialized for a {@link Job}. */
export function useJobOrder(): UseOrder<Job> {
	return useOrder('date_close');
}
