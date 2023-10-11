import type { Employee } from "@/schema"
import { EmployeeForm } from '../employee';
import { type IdEventsHandler, type IdEventsHandlerForm, useIdEventHandlers } from "../field"

export const Form: IdEventsHandlerForm<Employee> = props => <EmployeeForm {...props} id={`${props.id}--employee--form`} />;

/** Event handlers for a {@link Employee} ID. */
export const useEmployeeIdEventHandlers: IdEventsHandler<Employee> = (id, setEmployee) => useIdEventHandlers(id, setEmployee, Form);
