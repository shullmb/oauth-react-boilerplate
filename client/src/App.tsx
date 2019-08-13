import React, { useState, useEffect } from "react";
import axios from "axios";
import openNewAuthWindow from "./helpers/openWindow";

import "./App.css";

export interface IUser {
	_id?: string;
	githubId: number;
	accessToken?: string;
}

export interface IRepo {
	name: string;
}

const App: React.FC = () => {
	const [user, setUser] = useState<IUser>({} as IUser);
	const [repos, setRepos] = useState<IRepo[]>([]);

	function handleLogin(e: React.MouseEvent): void {
		e.preventDefault();
		let message: Promise<IUser> = openNewAuthWindow("/auth/github");
		message.then(res => setUser(res)).catch(err => console.log(err));
	}

	useEffect(() => {
		console.log("useEffect fetching data");
		if (Object.keys(user).length) {
			console.log(user);
			axios.get(`/api/${user.githubId}/repos`).then(res => {
				setRepos(res.data.repos);
			});
		} else {
		}
	}, [user]);

	let content = repos.map(repo => <p>{repo.name}</p>);

	return (
		<div className="App">
			<a onClick={handleLogin} href="/auth/github">
				Login with Github
			</a>
			{content}
		</div>
	);
};

export default App;
