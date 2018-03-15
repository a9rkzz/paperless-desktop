import React from "react";
import { Link } from "react-router";
import PaperlessComponent from "./PaperlessComponent";
import moment from "moment";
import { Card, CardImage, Image, CardContent, Content, Tile } from "bloomer";

String.prototype.trunc =
	String.prototype.trunc ||
	function(n) {
		return this.length > n ? this.substr(0, n - 1) + "&hellip;" : this;
	};

class DocumentItem extends PaperlessComponent {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		// load the image base64 data
		super.getDataUri(
			super.getHost() + this.props.document.thumbnail_url.replace("\\", ""),
			(result) => {
				this.setState({
					data: result
				});
			}
		);
	}

	// RENDER
	render() {
		return (
			<Tile isSize={1}>
				<Link className="document-item" to={"/document/" + this.props.document.id}>
					<Card>
						<CardImage>
							<Image isRatio="4:3" src={this.state.data} />
						</CardImage>
						<CardContent>
							<Content>
								<h3>{this.props.document.title.trunc(100)}</h3>
								<small>{moment(this.props.document.created).format("LLLL")}</small>
							</Content>
						</CardContent>
					</Card>
				</Link>
			</Tile>
		);
	}
}

export default DocumentItem;
