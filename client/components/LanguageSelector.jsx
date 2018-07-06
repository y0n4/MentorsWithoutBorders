import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const languages = [
  { English: 'en-GB_BroadbandModel' },
  { British: 'en-US_BroadbandModel' },
  { French: 'fr-FR_BroadbandModel' },
  { Spanish: 'es-ES_BroadbandModel' },
  { Portuguese: 'pt-BR_BroadbandModel' },
  { Japanese: 'ja-JP_BroadbandModel' },
  { Korean: 'ko-KR_BroadbandModel' },
  { Chinese: 'zh-CN_BroadbandModel' },
  { Arabic: 'ar-AR_BroadbandModel' },
];

class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      default: 'English',
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List>
          {languages.map((language, i) => (
            <div>
              <ListItem button>
                <Avatar src={`../../images/${Object.keys(language)[0]}.png`} className={classes.avatar} />
                <ListItemText primary={`${Object.keys(language)[0]}`} />
              </ListItem>
              {i < languages.length - 1 && <Divider inset component="li" />}
            </div>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(LanguageSelector);
