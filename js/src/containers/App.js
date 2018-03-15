import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tabs from "../components/Tabs";
import RemindersNotification from "../components/RemindersNotification";
import { Container } from "bloomer";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;
const ipcRenderer = electron.ipcRenderer;

class App extends React.Component {
	// CONSTRUCTOR
	constructor(props, context) {
		super(props, context);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		// EVENT: open document
		ipcRenderer.on("openDocument", (e, data) => {
			this.context.router.push("/document/" + data);
		});
	}

	// RENDER
	render() {
		return (
			<Container isFluid>
				{/*<RemindersNotification />*/}
				<Header history={this.props.history} />
				<Tabs history={this.props.history} />
				{this.props.children}
				<Footer />
			</Container>
		);
	}
}

// CONTEXT TYPES
App.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default App;
