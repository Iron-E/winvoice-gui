import type { Children } from "../props-with";
import { ICON } from "../css";
import { PlusIcon } from "@heroicons/react/20/solid";

/** A {@link TrashIcon | trash icon} with a 'delete' label.*/
export function AddIcon(): React.ReactElement {
	return <NewIcon>Add</NewIcon>;
}

/** A {@link TrashIcon | trash icon} with a 'delete' label.*/
export function NewIcon(props: Children): React.ReactElement {
	return <>
		<PlusIcon className={ICON} /> {props.children ?? 'New'}
	</>;
}
