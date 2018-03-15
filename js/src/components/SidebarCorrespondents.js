import React from "react";
import CorrespondentsActions from "../actions/CorrespondentsActions";
import CorrespondentsStore from "../stores/CorrespondentsStore";
import SidebarCorrespondentItem from "./SidebarCorrespondentItem";
import { MenuList } from "bloomer";

class SidebarCorrespondents extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = CorrespondentsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		CorrespondentsStore.listen(this.onChange);
		CorrespondentsActions.getCorrespondents();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		CorrespondentsStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// RENDER
	render() {
		if (!this.state.correspondents || !("results" in this.state.correspondents)) return null;

		return (
			<MenuList>
				{this.state.correspondents.results.map((c) => {
					return (
						<SidebarCorrespondentItem
							correspondent={c}
							key={"sidebar_correspondent_" + c.id}
							setCorrespondentFilter={this.props.setCorrespondentFilter}
						/>
					);
				})}
			</MenuList>
		);
	}
}

// CONTEXT TYPES
SidebarCorrespondents.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default SidebarCorrespondents;
