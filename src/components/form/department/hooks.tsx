import type { Department } from "@/schema"
import { DepartmentForm } from '../department';
import { type IdEventsHandler, type IdEventsHandlerNewForm, useIdEventHandlers } from "../field"

export const Form: IdEventsHandlerNewForm<Department> = props => <DepartmentForm {...props} id={`${props.id}--department--form`} />;

/** Event handlers for a {@link Department} ID. */
export const useDepartmentIdEventHandlers: IdEventsHandler<Department> = (id, setDepartment) => useIdEventHandlers(id, setDepartment, Form);
