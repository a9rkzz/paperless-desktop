import React from "react";
import SidebarTags from "./SidebarTags";
import SidebarCorrespondents from "./SidebarCorrespondents";
import { Menu, MenuLabel } from "bloomer";

class Sidebar extends React.Component {
	// RENDER
	render() {
		return (
			<Menu>
				<MenuLabel>Correspondents</MenuLabel>
				<SidebarCorrespondents setCorrespondentFilter={this.props.setCorrespondentFilter} />

				<MenuLabel>Tags</MenuLabel>
				<SidebarTags setTagFilter={this.props.setTagFilter} />
			</Menu>
		);
	}
}

export default Sidebar;
