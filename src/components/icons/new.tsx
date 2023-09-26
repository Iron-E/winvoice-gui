import { PlusIcon } from "@heroicons/react/20/solid";
import { ICON } from "../css";

/** A {@link TrashIcon | trash icon} with a 'delete' label.*/
export function NewIcon(): React.ReactElement {
	return <>
		<PlusIcon className={ICON} /> New
	</>;
}
