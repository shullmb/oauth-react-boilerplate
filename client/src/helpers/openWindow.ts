import { IUser } from "../App";

export default function openNewAuthWindow(uri: string): Promise<IUser> {
	// open a window
	const authWindow = window.open(uri, "_blank") as Window;

	// listen for messages from authWindow
	const authPromise: Promise<IUser> = new Promise((resolve, reject) => {
		window.addEventListener(
			"message",
			msg => {
				if (
					!msg.origin.includes(
						`${window.location.protocol}//${window.location.host}`
					)
				) {
					authWindow.close();
					reject("NotAllowed");
				}
				if (msg.data.payload) {
					try {
						resolve(JSON.parse(msg.data.payload));
					} catch (err) {
						resolve(msg.data.payload);
					} finally {
						authWindow.close();
					}
				} else {
					authWindow.close();
					reject("Unauthorized");
				}
			},
			false
		);
	});
	return authPromise;
}
