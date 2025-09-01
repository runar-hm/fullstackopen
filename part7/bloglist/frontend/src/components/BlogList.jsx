import Blog from './Blog';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Table,
  Paper,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const sorted = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Blogtitle</TableCell>
            <TableCell>Votes</TableCell>
            <TableCell>See more</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((b) => (
            <TableRow key={b.id}>
              <TableCell>
                <Link to={`/blogs/${b.id}`}>{b.title}</Link>
              </TableCell>
              <TableCell>{b.likes}</TableCell>
              <TableCell>
                <Link to={`/blogs/${b.id}`}>
                  <LinkIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlogList;
