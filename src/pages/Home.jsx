import TableData from "../components/TableData/TableData";

const customer_data = [
  { id: 1, name: 'minhthien', email: 'minhthien@gmail.com', username: 'minhthien', password: 'minhthien', role: 'Customer'},
  { id: 2, name: 'chucthien', email: 'chucthien@gmail.com', username: 'chucthien', password: 'chucthien', role: 'Customer'},
  { id: 3, name: 'hoangthinh', email: 'hoangthinh@gmail.com', username: 'hoangthinh', password: 'hoangthinh', role: 'Customer'},
  { id: 4, name: 'hoangthinh', email: 'hoangthinh@gmail.com', username: 'hoangthinh', password: 'hoangthinh', role: 'Customer'}
];

function Home() {
  return <div>
    <TableData type={"customer"} data={customer_data}/>
  </div>;
}

export default Home;
