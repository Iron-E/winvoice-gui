import type { Department, Employee } from "@/schema";
import type { Valuators } from "../order";


/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Employee}
 */
export function employeeValuators(departmentKey: keyof Department): Valuators<Employee> {
	return { department: { key: departmentKey } };
}
