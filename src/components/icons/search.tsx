import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ICON } from "../css";

/** A {@link TrashIcon | trash icon} with a 'delete' label.*/
export function SearchIcon(): React.ReactElement {
	return <>
		<MagnifyingGlassIcon className={ICON} /> Search
	</>;
}
