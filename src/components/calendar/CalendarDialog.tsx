
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';

type MyEventDialogProps = {
    open: boolean;
    title: string;
    isEditing: boolean;
    onClose: () => void;
    onSave: () => void;
    onDelete?: () => void;
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    eventId?: number; // Add eventId prop for navigation
};

const MyEventDialog: React.FC<MyEventDialogProps> = ({ open, title, isEditing, onClose, onSave, onDelete, onTitleChange, eventId }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{isEditing ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Event Title"
                    fullWidth
                    value={title}
                    onChange={onTitleChange}
                />
            </DialogContent>
            <DialogActions>
                {isEditing && (
                    <>
                        <Button onClick={onDelete} color="secondary">
                            Delete
                        </Button>
                        <Link href={`/calendar/${eventId}`} passHref>
                            <Button color="primary">
                                View More
                            </Button>
                        </Link>
                    </>
                )}
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onSave} color="primary">
                    {isEditing ? 'Save Changes' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MyEventDialog;
