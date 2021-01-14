import React, { useState } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../counter/Counter.module.css';
import {
  fetchGyms,
  selectGyms,
  selectShowGymLegend,
  toggleGymLegend
} from '../passes/gymSlice';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export function GymLegend() {
  const dispatch = useDispatch();

  // const showGymLegend = useSelector(selectShowGymLegend)
  const gyms = useSelector(selectGyms);

  const classes = useStyles();
  const [showGymLegend, setShowGymLegend] = useState(false);

  const toggleGymLegend = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setShowGymLegend(!showGymLegend);
  };

  const gymDivs = [];
  gyms
    // .sort((a, b) => a.id > b.id ? 1 : -1)
    .forEach(gym => {
      gymDivs.push(
        <ListItem key={gym.id}>
          <Avatar className={classes.avatar}>
            {gym['id']}
          </Avatar>
          &nbsp;
          <ListItemText primary={gym['name']} />
        </ListItem>
      )
    })

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleGymLegend}
      // onKeyDown={toggleGymLegend}
    >
      <List>
        {
          gymDivs
        }
      </List>
    </div>
  );

  const handleClick = () => {
    if (gyms.length === 0) {
      dispatch(fetchGyms());
    }
    setShowGymLegend(!showGymLegend); // TODO toggle
  }

  return (
    // {['left', 'right', 'top', 'bottom'].map((anchor) => (

    // ))}
    <div>
      <Button onClick={handleClick}>Show gym legend</Button>
      <Drawer anchor={'right'} open={showGymLegend} onClose={toggleGymLegend()}>
        {list()}
      </Drawer>
    </div>
  );







  // const dispatch = useDispatch();

  // const showGymLegend = useSelector(selectShowGymLegend)
  // const gyms = useSelector(selectGyms);

  // const gymDivs = [];
  // gyms
  //   // .sort((a, b) => a['id'] > b['id'] ? 1 : -1)
  //   .forEach(gym => {
  //     gymDivs.push(
  //       <div className={styles.row} key={gym.id}>
  //         <span className={styles.value}>{gym['id']}</span>
  //         <span className={styles.value}>{gym['name']}</span>
  //       </div>
  //     )
  //   })

  // return (
  //   <div>
  //     <button
  //       className={styles.button}
  //       aria-label="ToggleGymLegend"
  //       onClick={() => {
  //         if (gyms.length === 0) {
  //           console.log('fetch gyms toggle')
  //           dispatch(fetchGyms());
  //         }
  //         dispatch(toggleGymLegend())
  //       }}
  //     >
  //       Toggle gym legend
  //             </button>
  //     <br />
  //     <br />
  //     {
  //       showGymLegend ?
  //         <div>
  //           {
  //             gymDivs
  //           }
  //         </div>
  //         : null
  //     }
  //   </div>

  // );
}
