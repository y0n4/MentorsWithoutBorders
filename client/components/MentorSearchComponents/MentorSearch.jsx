import React, { Component } from 'react';
import SelectedMentors from './SelectedMentors';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
      filteredMentors: [],
      selectedMentors: [],
      ageOptions: [],
      page: 0,
      rowsPerPage: 5
    };

    this.handleClose = this.handleClose.bind(this);
    this.selectMentors = this.selectMentors.bind(this);
    this.filterAgeRange = this.filterAgeRange.bind(this);
    this.filterOnlineNow = this.filterOnlineNow.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.createAgeOptions = this.createAgeOptions.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    this.handleChange = name => event => {
      if (name === 'online') {
        this.setState({ [name]: !this.state.online });
        this.filterOnlineNow();
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

      this.selectMentors(0, 5);
    });

    this.createAgeOptions();
  }

  filterOnlineNow() {
    let mentors = this.state.filteredMentors.length < 1 ? this.state.allMentors : this.state.filteredMentors;
    let filtered = mentors.filter(mentor => mentor.online === this.state.online );

    this.setState({
      filteredMentors: filtered
    });
  }

  filterAgeRange() {
    let mentors = this.state.filteredMentors.length < 1 ? this.state.allMentors : this.state.filteredMentors;
    let filtered = mentors.filter((mentor) => {
      return mentor.dob.age >= this.state.startAge && mentor.dob.age <= this.state.endAge;
    });

    if (filtered.length === 0) {
      alert('Sorry, no results found');
    } else {
      this.setState({
        filteredMentors: filtered
      });
    }
  }

  createAgeOptions() {
    let ageOptions = [];

    for (let i = 18; i <= 100; i++) {
      ageOptions.push(<option value={i}>{i}</option>)
    }

    this.setState({
      ageOptions: ageOptions
    });
  }

  selectMentors(pgNum, rows) {
    pgNum = pgNum + 1;

    let mentors = this.state.filteredMentors.length < 1 ? this.state.allMentors : this.state.filteredMentors;

    let endNum = pgNum * rows;
    let startNum = endNum - rows;
    let selectedMentors = mentors.slice(startNum, endNum);
    
    this.setState({
      selectedMentors: selectedMentors
    });
  }

  handleChangePage(event, page) {
    this.selectMentors(page, this.state.rowsPerPage);
    this.setState({ page });
  };

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
    this.selectMentors(this.state.page, event.target.value)
  };

  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose(name) {
    if (name === 'cancel') {
      this.setState({ open: false });
    } else if (this.state.startAge <= this.state.endAge) {
      this.setState({ open: false });
      this.filterAgeRange();
    } else {
      alert('Please make sure Min Age is less than Max Age');
    }
  };

  render() {
    const { classes } = this.props;
    const spacing = 16;

    return (
      <div className='mentorsArea'>
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
            <Card className={classes.card}>
              <TablePagination
                component="div"
                count={(this.state.filteredMentors.length < 1) ? this.state.allMentors.length : this.state.filteredMentors.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage} 
              />
            </Card>
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
                            {this.state.ageOptions.map((option) => {
                              return option;
                            })}
                          </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor='age-native-simple'>Max Age</InputLabel>
                          <Select
                            native
                            value={this.state.endAge}
                            onChange={this.handleChange('endAge')}
                            input={<Input id='age-native-simple' />}
                          >
                            <option value='' />
                            {this.state.ageOptions.map((option) => {
                              return option;
                            })}
                          </Select>
                        </FormControl>
                      </form>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => { this.handleClose('cancel')} }  color='primary'>
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
      </div>
    );
  }
}

MentorSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};
//
export default withStyles(styles)(MentorSearch);