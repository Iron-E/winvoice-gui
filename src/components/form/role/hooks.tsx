import { Role } from "@/schema";
import { useIdEventHandlers } from "../field";
import { RoleForm } from "../role";

type RoleIdEventHandlers = typeof useIdEventHandlers<Role>;

/** Event handlers for a {@link Role} ID. */
export function useRoleIdEventHandlers(
	id: string,
	setRole: Parameters<RoleIdEventHandlers>[0],
): ReturnType<RoleIdEventHandlers> {
	return useIdEventHandlers(setRole, p => <RoleForm {...p} id={`${id}--role--form`} />);
}
