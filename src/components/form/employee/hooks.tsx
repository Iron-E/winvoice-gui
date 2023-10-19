import type { Employee } from "@/schema"
import { EmployeeForm } from '../employee';
import { type IdEventsHandler, type IdEventsHandlerNewForm, useIdEventHandlers } from "../field"

export const Form: IdEventsHandlerNewForm<Employee> = props => <EmployeeForm {...props} id={`${props.id}--employee--form`} />;

/** Event handlers for a {@link Employee} ID. */
export const useEmployeeIdEventHandlers: IdEventsHandler<Employee> = (id, setEmployee) => useIdEventHandlers(id, setEmployee, Form);
