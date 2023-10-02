import type { Department, Employee, Role, User } from "@/schema";
import type { Valuators } from "../order";
import { employeeValuators, ROLE_VALUATORS } from "../../table";

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link User}
 */
export function userValuators(keys: {
	employee: keyof Employee,
	employeeDepartment: keyof Department,
	role: keyof Role,
}): Valuators<User> {
	return {
		employee: { key: keys.employee, valuators: employeeValuators(keys.employeeDepartment) },
		role: { key: keys.role, valuators: ROLE_VALUATORS },
	};
}
