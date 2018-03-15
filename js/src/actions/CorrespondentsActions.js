import alt from "../alt";
import axios from "axios";
import async from "async";

// CORRESPONDENTS ACTIONS
class CorrespondentsActions {
	constructor() {
		this.generateActions(
			"getCorrespondentsSuccess",
			"getCorrespondentsFail",
			"deleteCorrespondentsSuccess",
			"deleteCorrespondentsFail",
			"addCorrespondentSuccess",
			"addCorrespondentFail",
			"editCorrespondentSuccess",
			"editCorrespondentFail"
		);
	}

	// GET CORRESPONDENTS
	getCorrespondents() {
		const url = localStorage.getItem("settings.host") + "/api/correspondents/";

		axios({
			method: "get",
			url: url,
			auth: {
				username: localStorage.getItem("settings.auth.username"),
				password: localStorage.getItem("settings.auth.password")
			}
		})
			.then(this.actions.getCorrespondentsSuccess)
			.catch(this.actions.getCorrespondentsFail);
	}

	// DELETE CORRESPONDENTS
	deleteCorrespondents(ids) {
		// asyncroniously delete all document ids
		async.every(
			ids,
			(id, callback) => {
				const url = localStorage.getItem("settings.host") + "/api/correspondents/" + id;

				// delete document
				axios({
					method: "delete",
					url: url,
					auth: {
						username: localStorage.getItem("settings.auth.username"),
						password: localStorage.getItem("settings.auth.password")
					}
				})
					.then((r) => {
						return callback(null, r);
					})
					.catch((e) => {
						console.error(e);
						return callback(e);
					});
			},
			(err, result) => {
				console.log(err, result);

				if (err) {
					return this.actions.deleteCorrespondentsFail(err);
				}

				// if result is true then every file exists
				return this.actions.deleteCorrespondentsSuccess(ids);
			}
		);
	}

	// ADD CORRESPONDENT
	addCorrespondent(data) {
		const url = localStorage.getItem("settings.host") + "/api/correspondents/";

		axios({
			method: "post",
			url: url,
			data: data,
			auth: {
				username: localStorage.getItem("settings.auth.username"),
				password: localStorage.getItem("settings.auth.password")
			}
		})
			.then(this.actions.addCorrespondentSuccess)
			.catch(this.actions.addCorrespondentFail);
	}

	// EDIT CORRESPONDENT
	editCorrespondent(data) {
		const url = localStorage.getItem("settings.host") + "/api/correspondents/" + data.id + "/";

		axios({
			method: "put",
			url: url,
			data: data,
			auth: {
				username: localStorage.getItem("settings.auth.username"),
				password: localStorage.getItem("settings.auth.password")
			}
		})
			.then(this.actions.editCorrespondentSuccess)
			.catch(this.actions.editCorrespondentFail);
	}
}

export default alt.createActions(CorrespondentsActions);
