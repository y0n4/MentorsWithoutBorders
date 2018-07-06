import React, { Component } from 'react';
import SelectedMentors from './SelectedMentors';
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
import TablePagination from '@material-ui/core/TablePagination';
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
import axios from 'axios';

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
      online: false,
      open: false,
      startAge: '',
      endAge: '',
      language: '',
      allMentors: [],
      selectedMentors: [],
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.mentorsPagination = this.mentorsPagination.bind(this);

    this.handleChange = name => event => {
      if (name === 'online') {
        this.setState({ [name]: !this.state.online });
      } else {
        this.setState({ [name]: event.target.value });
      }
    }
  }

  componentDidMount() {
    axios.get('/allMentors')
    .then((res) => {
      this.setState({
        allMentors: res.data
      });

      this.mentorsPagination(1);
    });
  }

  mentorsPagination(pgNum) {
    let endNum = pgNum * 10;
    let startNum = endNum - 10;
    let selectedMentors = this.state.allMentors.slice(startNum, endNum);
    
    this.setState({
      selectedMentors: selectedMentors
    });
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
      <div className='mentorsArea'>
        <Paper className={classes.root} elevation={1}>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={10}>
              <Card className={classes.card}>
                <CardContent> 
                  {this.state.selectedMentors.map((mentor, idx) => {
                    return (
                      <SelectedMentors mentor={mentor} key={idx} />
                    );
                  })}
                </CardContent>
              </Card>
              <TablePagination
                component="div"
                // count={data.length}
                // rowsPerPage={rowsPerPage}
                // page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </Grid>
            <Grid item xs={2}>
              <Card className={classes.card}>
                <CardContent>
                  <div className='onlineStatus'>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.checkedB}
                          onChange={this.handleChange('online')}
                          value="online"
                          color="primary"
                        />
                      }
                      label="Online Now"
                    />
                  </div>
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
//
export default withStyles(styles)(MentorSearch);