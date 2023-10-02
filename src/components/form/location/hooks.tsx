import type { Location } from '@/schema';
import { LocationForm } from "../location";
import { useIdEventHandlers } from "../field";

type LocationIdEventHandlers = typeof useIdEventHandlers<Location>;

/** Event handlers for a {@link Location} ID. */
export function useLocationIdEventHandlers(
	id: string,
	setLocation: Parameters<LocationIdEventHandlers>[0],
): ReturnType<LocationIdEventHandlers> {
	return useIdEventHandlers(setLocation, p => <LocationForm {...p} id={`${id}--location--form`} />);
}
