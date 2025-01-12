interface UserObjectInterface {
	id?: string;
	email?: string;
	name?: string;
	password?: string;
	links?: Array<LinkObjectInterface>;
}

interface LinkObjectInterface {
	url: string;
	fullname: string;
	icon_url: string;
	shortname: string;
	id: string;
	linkColor:
		| "Default"
		| "Green"
		| "Blue"
		| "Purple"
		| "Pink"
		| "Red"
		| "Orange"
		| "Yellow"
		| "Black"
		| "Brown";
}
interface ResponseDataObjectInterface {
	success: boolean;
	message: string;
	data: UserObjectInterface;
}

interface InitialStateInterface {
	userData: UserObjectInterface;
	isAuthenticated: boolean;
	loading: boolean;
	theme: "dark" | "light";
}

interface LinkCardPropsInterface {
	id: string;
	fullname: string;
	shortname: string;
	url: string;
	icon_url: string;
	linkColor: string;
}
interface OptionsButtonPropInterface {
	id: string;
	fullname: string;
	url: string;
	linkColor: { name: string; colorCode: string };
}
