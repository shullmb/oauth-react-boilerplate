import React, { useState, useEffect } from "react";
import axios from "axios";
import openNewAuthWindow from "./helpers/openWindow";

import "./App.css";

export interface IUser {
	_id?: string;
	githubId: number;
	accessToken?: string;
}

const App: React.FC = () => {
	const [user, setUser] = useState<IUser>({} as IUser);
	const [repose, setRepos] = useState([]);

	function handleLogin(e: React.MouseEvent): void {
		e.preventDefault();
		let message: Promise<IUser> = openNewAuthWindow("/auth/github");
		message.then(res => setUser(res));
	}

	useEffect(() => {
		console.log("useEffect fetching data");
		if (Object.keys(user).length) {
			axios.get(`/api/${user.githubId}/repos`).then(res => {
				setRepos(res.data);
			});
		} else {
		}
	}, [user]);

	return (
		<div className="App">
			<a href="/auth/github">Login with Github</a>
		</div>
	);
};

export default App;
