import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _flowRight from 'lodash/flowRight';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SendFactoidForm from './SendFactoidForm';
import ConvertECForm from './ConvertECForm';
import ViewPrivateKeyForm from './ViewPrivateKeyForm';
import AddressInfoTab from './AddressInfoTab';
import { withNetwork } from '../context/NetworkContext';

class WalletTabContent extends React.Component {
	state = {
		tabValue: 0,
	};

	handleChange = (event, tabValue) => {
		this.setState({ tabValue });
	};

	render() {
		const {
			classes,
			type,
			activeAddress,
			networkController: { networkProps },
		} = this.props;

		let tabValue = this.state.tabValue;

		if (tabValue === 3 && activeAddress.importType !== 'seed') {
			//only seeds have tab 3
			tabValue = 0;
		}

		return (
			<div className={classes.root}>
				{type === 'fct' && (
					<div>
						<Tabs
							value={tabValue}
							onChange={this.handleChange}
							indicatorColor="primary"
							textColor="primary"
							centered
						>
							<Tab label="Address Info" />
							<Tab label={'Send ' + networkProps.factoidAbbreviationFull} />
							<Tab
								label={
									'Convert ' +
									networkProps.factoidAbbreviation +
									' to ' +
									networkProps.ecAbbreviation
								}
							/>
							{activeAddress.importType === 'seed' && (
								<Tab label="View Private Key" />
							)}
						</Tabs>
						{tabValue === 0 && (
							<TabContainer classes={classes}>
								<AddressInfoTab />
							</TabContainer>
						)}
						{tabValue === 1 && (
							<TabContainer classes={classes}>
								<SendFactoidForm />
							</TabContainer>
						)}
						{tabValue === 2 && (
							<TabContainer classes={classes}>
								<ConvertECForm />
							</TabContainer>
						)}
						{tabValue === 3 && (
							<TabContainer classes={classes}>
								<ViewPrivateKeyForm />
							</TabContainer>
						)}
					</div>
				)}
				{type === 'ec' && (
					<div>
						<Tabs
							value={0}
							onChange={this.handleChange}
							indicatorColor="primary"
							textColor="primary"
							centered
						>
							<Tab label="Address Info" />
						</Tabs>

						<TabContainer classes={classes}>
							<AddressInfoTab />
						</TabContainer>
					</div>
				)}
			</div>
		);
	}
}
WalletTabContent.propTypes = {
	classes: PropTypes.object.isRequired,
};

function TabContainer(props) {
	return (
		<Typography component="div" className={props.classes.tabContainer}>
			{props.children}
		</Typography>
	);
}
TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

const styles = {
	root: { textAlign: 'center' },
	tabContainer: {
		paddingLeft: 55,
		paddingRight: 55,
		paddingTop: 18,
		paddingBottom: 10,
	},
};

const enhancer = _flowRight(withNetwork, withStyles(styles));
export default enhancer(WalletTabContent);
