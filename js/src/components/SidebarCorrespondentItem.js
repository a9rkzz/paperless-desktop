import React from "react";
import $ from "jquery";
import { MenuLink } from "bloomer";

class SidebarCorrespondentItem extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			active: false
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).on("changeExternCorrespendent", this.changeExternCorrespendent.bind(this));
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("changeExternCorrespendent");
	}

	// SET CORRESPONDENT FILTER
	setCorrespondentFilter() {
		$(window).trigger("changeExternCorrespendent", {
			correspondent: this.props.correspondent.slug
		});

		// set or unset the tag
		if (this.state.active === true) {
			this.props.setCorrespondentFilter(null);
		} else {
			this.props.setCorrespondentFilter(this.props.correspondent.slug);
		}

		// toggle active state
		this.setState({
			active: !this.state.active
		});
	}

	// CHANGE EXTERN CORRESPONDENT
	changeExternCorrespendent(e, data) {
		this.setState({
			active: this.props.correspondent.slug === data.correspondent
		});
	}

	// RENDER
	render() {
		if (this.state.active === true) {
			return (
				<li>
					<MenuLink onClick={this.setCorrespondentFilter.bind(this)} isActive>
						{this.props.correspondent.name}
					</MenuLink>
				</li>
			);
		} else {
			return (
				<li>
					<MenuLink onClick={this.setCorrespondentFilter.bind(this)}>
						{this.props.correspondent.name}
					</MenuLink>
				</li>
			);
		}
	}
}

export default SidebarCorrespondentItem;
