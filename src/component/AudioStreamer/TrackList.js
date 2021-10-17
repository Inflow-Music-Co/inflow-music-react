import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'name', label: 'name', minWidth: 170 },
    {
      id: 'mixtape',
      label: 'mixtape',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'plays',
      label: 'plays',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];
  
  function createData(name, mixtape, code) {
    return { name, mixtape, code};
  }

const TrackList = () => {

    const [page, setPage] = useState(0);
    const [rows, setRows] = useState();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const artist = useSelector((state) => state.app.artistData);

    useEffect(() => {
        console.log(artist.mp3_playlists[0].name)
        const tableData = artist.mp3_playlists[0].mp3s.map((mp3, index) => {
            return createData(mp3.Key, 'mixtape', index)
        });
        setRows(tableData)
        console.log('rows', rows);
    },[])

   

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
    <div>
    {rows && 
    <Paper sx={{ width: '100%', overflow: 'hidden', background: 'black'}}>
      <TableContainer sx={{ maxHeight: 440, fontColor: 'white'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{}}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, background: 'black', color:'white' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{ color: 'white' }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper> }
    </div>
    )
}

export default TrackList
