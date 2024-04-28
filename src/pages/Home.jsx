import TableData from "../components/TableData/TableData";

const customer_columns = [
  { field: 'id', headerName: 'Customer_id', width: '15%'},
  { field: 'name', headerName: 'Name',  width: '20%'},
  { field: 'email', headerName: 'Email',  width: '20%'},
  { field: 'username', headerName: 'Username',  width: '20%'},
  { field: 'password', headerName: 'Password', width: '15%'},
  { field: 'role', headerName: 'Role', width: '10%'}
];
const customer_data = [
  { id: 1, name: 'minhthien', email: 'minhthien@gmail.com', username: 'minhthien', password: 'minhthien', role: 'Customer'},
  { id: 2, name: 'chucthien', email: 'chucthien@gmail.com', username: 'chucthien', password: 'chucthien', role: 'Customer'},
  { id: 3, name: 'hoangthinh', email: 'hoangthinh@gmail.com', username: 'hoangthinh', password: 'hoangthinh', role: 'Customer'},
  { id: 4, name: 'hoangthinh', email: 'hoangthinh@gmail.com', username: 'hoangthinh', password: 'hoangthinh', role: 'Customer'}
];

function Home() {
  // return <TableData columns={admin_columns} data={admin_data}/>;
  // return <TableData columns={staff_columns} data={staff_data}/>;
  return <TableData columns={customer_columns} data={customer_data}/>;
}

export default Home;
