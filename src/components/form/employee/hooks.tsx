import type { Employee } from "@/schema";
import { EmployeeForm } from "../employee";
import { useIdEventHandlers } from "../field";

type EmployeeIdEventHandlers = typeof useIdEventHandlers<Employee>;

/** Event handlers for a {@link Employee} ID. */
export function useEmployeeIdEventHandlers(
	id: string,
	setEmployee: Parameters<EmployeeIdEventHandlers>[0],
): ReturnType<EmployeeIdEventHandlers> {
	return useIdEventHandlers(setEmployee, p => <EmployeeForm {...p} id={`${id}--employee--form`} />);
}
