/** The possible routes of the API. */
export enum Route {
	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::CONTACT`}. */
	Contact = '/contact',

	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::DEPARTMENT`}. */
	Department = '/department',

	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::EMPLOYEE`}. */
	Employee = '/employee',

	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::EXPENSE`}. */
	Expense = '/expense',

	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::EXPORT`}. */
	Export = '/job/export',

	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::JOB`}. */
	Job = '/job',

	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::LOCATION`}. */
	Location = '/location',

	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::LOGIN`}. */
	Login = '/login',

	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::LOGOUT`}. */
	Logout = '/logout',

	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::ORGANIZATION`}. */
	Organization = '/organization',

	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::ROLE`}. */
	Role = '/role',

	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::TIMESHEET`}. */
	Timesheet = '/timesheet',

	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::USER`}. */
	User = '/user',

	/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::routes::USER`}. */
	WhoAmI = '/whoami',
}

/** Routes that require user input to make a complete request. */
export type UserInputRoute = Exclude<Route, Route.Export | Route.Login | Route.Logout | Route.WhoAmI>;
