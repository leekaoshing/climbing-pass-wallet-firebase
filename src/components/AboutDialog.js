import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectShowAboutDialog,
    setShowAboutDialog
} from '../reducers/userSlice';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
    }
}));

export function AboutDialog() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const showAboutDialog = useSelector(selectShowAboutDialog);

    const handleClose = () => {
        dispatch(setShowAboutDialog(false));
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="about-dialog-title" open={showAboutDialog}>
            <DialogTitle>About</DialogTitle>
            <Paper className={classes.paper} elevation={0}>
                <p style={{ textAlign: 'justify' }}>
                    Welcome to the <b>Climbing Pass Wallet</b>! This is a community-driven project for climbers to keep track of their existing multipasses.
                    No more calling up gyms or logging into different websites just to check your remaining passes :)
                </p>
                <p style={{ textAlign: 'justify' }}>
                    At this stage, this wallet will require manual recording of passes. Simply create an account if you haven't already, or log in,
                    and add or subtract passes as you buy more passes or visit gyms.
                </p>
                <p style={{ textAlign: 'justify' }}>
                    If there is sufficient community adoption, our next step would be to approach the various gyms to link this to their databases for
                    automatic updating of passes. Do share this site with your friends to help out!
                </p>
            </Paper>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={handleClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}