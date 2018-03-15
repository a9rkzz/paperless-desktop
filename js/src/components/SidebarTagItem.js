import React from "react";
import $ from "jquery";
import PaperlessComponent from "./PaperlessComponent";
import { MenuLink } from "bloomer";

class SidebarTagItem extends PaperlessComponent {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			active: false
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).on("changeExternTag", this.changeExternTag.bind(this));
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("changeExternTag");
	}

	// SET TAG FILTER
	setTagFilter() {
		$(window).trigger("changeExternTag", { tag: this.props.tag.slug });

		// set or unset the tag
		if (this.state.active === true) {
			this.props.setTagFilter(null);
		} else {
			this.props.setTagFilter(this.props.tag.slug);
		}

		// toggle active state
		this.setState({
			active: !this.state.active
		});
	}

	// CHANGE EXTERN TAG
	changeExternTag(e, data) {
		this.setState({
			active: this.props.tag.slug === data.tag
		});
	}

	// RENDER
	render() {
		if (this.state.active === true) {
			return (
				<li>
					<MenuLink onClick={this.setTagFilter.bind(this)} isActive>
						{this.props.tag.name}
					</MenuLink>
				</li>
			);
		} else {
			return (
				<li>
					<MenuLink onClick={this.setTagFilter.bind(this)}>
						{this.props.tag.name}
					</MenuLink>
				</li>
			);
		}
	}
}

export default SidebarTagItem;
