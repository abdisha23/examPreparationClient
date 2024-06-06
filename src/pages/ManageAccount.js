import React, { useState } from 'react';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  createTheme,
  ThemeProvider,
  GlobalStyles

} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#f44336',
    },
  },
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: 'none',
      },
    },
    MuiTableContainer: {
      root: {
        boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.1)',
      },
    },
  },
});

const usersData = [
  { id: 1, name: 'John Doe', role: 'Student', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'SME', status: 'Active' },
  { id: 3, name: 'Mark Johnson', role: 'SME', status: 'Disabled' },
  // Add more user data as needed
];

const ManageAccountPage = () => {
  const [users, setUsers] = useState(usersData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleRemoveUser = () => {
    // Remove the selected user from the users array
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setSelectedUser(null);
    setDeleteConfirmationOpen(false);
  };

  const handleEditUser = (updatedUser) => {
    // Find the selected user and update their information
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setSelectedUser(null);
  };

  const handleDisableUser = () => {
    // Disable the selected user
    const updatedUser = { ...selectedUser, status: 'Disabled' };
    handleEditUser(updatedUser);
  };

  const handleEnableUser = () => {
    // Enable the selected user
    const updatedUser = { ...selectedUser, status: 'Active' };
    handleEditUser(updatedUser);
  };

  const handleOpenDeleteConfirmation = (user) => {
    setSelectedUser(user);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setSelectedUser(null);
    setDeleteConfirmationOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
       <GlobalStyles styles={{ // Remove duplicate styles prop
        body: {
          backgroundColor: '#AEC1E7'
        },
      }} />
  
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Manage Accounts
        </Typography>
        <TableContainer component={Paper} style={{ marginBottom: '2rem', backgroundColor: '#EBBCBC' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDeleteConfirmation(user)} color="primary" aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                    {user.status === 'Active' ? (
                      <IconButton onClick={handleDisableUser} color="secondary" aria-label="Disable">
                        <BlockIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={handleEnableUser} color="primary" aria-label="Enable">
                        <CheckCircleIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmationOpen} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Delete User Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveUser} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ManageAccountPage;