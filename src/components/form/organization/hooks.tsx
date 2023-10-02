import type { Organization } from "@/schema";
import { OrganizationForm } from "../organization";
import { useIdEventHandlers } from "../field";

type OrganizationIdeventHandlers = typeof useIdEventHandlers<Organization>;

/** Event handlers for a {@link Organization} ID. */
export function useOrganizationIdEventHandlers(
	id: string,
	setOrganization: Parameters<OrganizationIdeventHandlers>[0],
): ReturnType<OrganizationIdeventHandlers> {
	return useIdEventHandlers(setOrganization, p => <OrganizationForm {...p} id={`${id}--organization--form`} />);
}
