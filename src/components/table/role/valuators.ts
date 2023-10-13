import parse from 'parse-duration';
import type { Role } from "@/schema";
import type { Valuators } from "../order";

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Organization}
 */
export const ROLE_VALUATORS: Readonly<Valuators<Role>> = { password_ttl: { map: parse } };
