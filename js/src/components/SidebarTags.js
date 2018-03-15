import React from "react";
import TagsActions from "../actions/TagsActions";
import TagsStore from "../stores/TagsStore";
import SidebarTagItem from "./SidebarTagItem";
import { MenuList } from "bloomer";

class SidebarTags extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = TagsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		TagsStore.listen(this.onChange);
		TagsActions.getTags();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		TagsStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// RENDER
	render() {
		if (!this.state.tags || !("results" in this.state.tags)) return null;

		return (
			<MenuList>
				{this.state.tags.results.map((t) => {
					return (
						<SidebarTagItem
							tag={t}
							key={"sidebar_tags_" + t.id}
							setTagFilter={this.props.setTagFilter}
						/>
					);
				})}
			</MenuList>
		);
	}
}

// CONTEXT TYPES
SidebarTags.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default SidebarTags;
