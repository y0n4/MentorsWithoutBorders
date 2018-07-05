import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  paper: {
    height: 140,
    width: 100,
  },
  card: {
    minWidth: 275,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  pos: {
    marginBottom: 12,
  },
});

class MentorSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      startAge: '',
      endAge: '',
      language: '',
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);

    this.handleChange = name => event => {
      this.setState({ [name]: event.target.value })
    }
  }

  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const spacing = 16;

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={10}>
              <Card className={classes.card}>
                <CardContent>
                  Blah Blah
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Card className={classes.card}>
                <CardContent>
                  <div className='ageSelector'>
                    <Button onClick={this.handleClickOpen}>Select an age range</Button>
                    <Dialog
                      disableBackdropClick
                      disableEscapeKeyDown
                      open={this.state.open}
                      onClose={this.handleClose}
                    >
                      <DialogTitle>Age Range</DialogTitle>
                      <DialogContent>
                        <form className={classes.container}>
                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor='age-native-simple'>Min Age</InputLabel>
                            <Select
                              native
                              value={this.state.startAge}
                              onChange={this.handleChange('startAge')}
                              input={<Input id='age-native-simple' />}
                            >
                              <option value='' />
                              <option value={10}>Ten</option>
                              <option value={20}>Twenty</option>
                              <option value={30}>Thirty</option>
                            </Select>
                          </FormControl>
                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor='age-simple'>Max Age</InputLabel>
                            <Select
                              value={this.state.endAge}
                              onChange={this.handleChange('endAge')}
                              input={<Input id='age-simple' />}
                            >
                              <MenuItem value=''>
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        </form>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                          Cancel
                        </Button>
                        <Button onClick={this.handleClose} color='primary'>
                          Ok
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  <div className='language'>
                    <InputLabel htmlFor='language-simple'>Language</InputLabel>
                    <Select
                      native
                      value={this.state.language}
                      onChange={this.handleChange('language')}
                      input={<Input id='language-simple' />}
                    >
                      <option value='' />
                      <option value={'english'}>English</option>
                      <option value={'chinese'}>Chinese</option>
                      <option value={'japanese'}>Japanese</option>
                      <option value={'korean'}>Korean</option>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

MentorSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MentorSearch);