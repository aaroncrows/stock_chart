import { connect } from 'react-redux' ;
import Chart from '../components/chart';

const mapStateToProps = (state) => {
  return {
    stockData: state.stockData,
    isFetching: state.isFetching,
    fetchError: state.fetchError
  };
};

const RenderChart = connect(mapStateToProps, null)(Chart);

export default RenderChart;
