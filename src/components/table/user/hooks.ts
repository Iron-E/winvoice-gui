import type { User } from "@/schema";
import { type UseOrder, useOrder } from "../order";

/** @returns {@link useOrder} specialized for a {@link User}. */
export function useUserOrder(): UseOrder<User> {
	return useOrder('username');
}
