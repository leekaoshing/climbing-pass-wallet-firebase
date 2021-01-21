import Dialog from '@material-ui/core/Dialog';
import { useSelector } from 'react-redux';

export function DialogWrapper(props) {

    const openSelector = props.openSelector;
    const DialogChild = props.dialogChild;
    const onClose = props.onClose;

    const open = useSelector(openSelector);

    return (
        <Dialog onClose={onClose} aria-labelledby="about-dialog-title" open={open}>
            <DialogChild onClose={onClose} />
        </Dialog>
    );
}