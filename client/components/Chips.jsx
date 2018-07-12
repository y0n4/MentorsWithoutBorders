import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class Chips extends React.Component {

  render(props) {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        {this.props.chipData.map(data => {
          return (
            <Chip
              label={data}
              onDelete={() => this.props.handleDelete(data)}
              className={classes.chip}
            />
          );
        })}
      </Paper>
    );
  }
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);