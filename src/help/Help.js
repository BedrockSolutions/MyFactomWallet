import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class Help extends Component {
	render() {
		return (
			<div>
				<br />
				<br />
				<br />
				<Typography variant="h5">
					<a href="https://support.mycrypto.com/getting-started/getting-started-new.html">
						MyCrypto's Getting Started
					</a>
					&nbsp;does a nice job explaining the difference between our websites
					and more typical wallets.
				</Typography>
			</div>
		);
	}
}

export default Help;
