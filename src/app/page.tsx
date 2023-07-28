"use client";

import { useState } from 'react';

const NAMES = ["Foo", "Bar"] as const;

function Header(args: { title?: string }) {
	return (
		<h1 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{args.title || "Default title"}</h1>
	);
}

export default function HomePage() {
	const [likes, setLikes] = useState(0);
	return (
		<div>
			<Header title="Something something" />
			<ul>
				{NAMES.map((name) => (
					<li key={name}>{name}</li>
				))}
			</ul>

			<button onClick={() => setLikes(likes + 1)}>Toot ({likes})</button>
		</div>
	);
}
