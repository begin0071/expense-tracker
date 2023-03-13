import NetWorthTable from "../components/TransactionsPage/NetWorth";
import RecentTransactions from "../components/TransactionsPage/RecentTransactions";
import NewTransaction from "../components/TransactionsPage/NewTransaction";
import { Wrapper } from "../components";

const Transactions = (props) => {
  return (
    <Wrapper>
      <h1>Transactions</h1>
      <div class="flexbox-container">
        <NetWorthTable />
        <RecentTransactions />
        <NewTransaction />
      </div>
    </Wrapper>
  );
};

export default Transactions;
