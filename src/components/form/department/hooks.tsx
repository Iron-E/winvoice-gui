import type { Department } from "@/schema";
import { DepartmentForm } from "../department";
import { useIdEventHandlers } from "../field";

type DepartmentIdEventHandlers = typeof useIdEventHandlers<Department>;

/** Event handlers for a {@link Department} ID. */
export function useDepartmentIdEventHandlers(
	id: string,
	setDepartment: Parameters<DepartmentIdEventHandlers>[0],
): ReturnType<DepartmentIdEventHandlers> {
	return useIdEventHandlers(setDepartment, p => <DepartmentForm {...p} id={`${id}--department--form`} />);
}
