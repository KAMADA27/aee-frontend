import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

import { updateObject } from '../../../shared/utility';

import Input from '../../UI/Input/Input';
import { Success } from '../../UI/Button/Button';
import styled from 'styled-components';

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  button: {
    height: 40px;
  }
`;

const NoData = styled.div`
  padding: 50px;
`;

const InputContainer = styled.div`
  width: 35%;
`;

const Table = props => {
  const [filter, setFilter] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Filtrar pelo nome' 
    },
    value: '',
    validation: {},
    valid: true
  });
  const [filteredItems, setFilteredItems] = useState([]);
  const { data, filterBy, filterProp, filterNested, filterNumType } = props;
  const [filterItem, setFilterItem] = useState(filterBy);

  const paginationComponentOptions = { 
    rowsPerPageText: 'Itens por página:', 
    rangeSeparatorText: 'de', 
    noRowsPerPage: false, 
    selectAllRowsItem: false, 
    selectAllRowsItemText: 'All' 
  }
  let noData = (
    <NoData>
      Não há registros para exibir
    </NoData>
  );
  
  useEffect(() => {
    let updatedData = [];

    data.forEach(elements => {
      let dataProps = {};

      for (let key in elements) {
        dataProps[key] = elements[key];
      }

      updatedData.push(dataProps);
    });

    updatedData = updatedData.filter(item => {
      if (filterProp && filterNested) {
        return item[filterItem][filterProp][filterNested] && item[filterItem][filterProp][filterNested].toLowerCase().includes(filter.value.toLocaleLowerCase());
      } else if (filterProp) {
        return item[filterItem][filterProp] && item[filterItem][filterProp].toLowerCase().includes(filter.value.toLocaleLowerCase());
      } else {
        return item[filterItem] && item[filterItem].toLowerCase().includes(filter.value.toLocaleLowerCase());
      }
    });

    setFilteredItems(updatedData);
  }, [data, filter, filterBy, filterProp, filterNested, filterItem])

  const inputChangedHandler = (event) => {
    const value = event.target.value;

    if (Number(value)) {
      setFilterItem(filterNumType);
    } else {
      setFilterItem(filterBy);
    }

    const updatedFilter = updateObject(filter, { value: value });
    setFilter(updatedFilter);
  }
  
  return (
    <React.Fragment>
      <TableHeader>
        <InputContainer>
          <Input 
            elementType={ filter.elementType }
            elementConfig={ filter.elementConfig }
            value={ filter.value }
            changed={ (event) => inputChangedHandler(event) }
          />
        </InputContainer>
          <Success onClick={ props.clicked }>
              { props.btnName }
          </Success> 
      </TableHeader>
      <DataTable 
        columns={ props.columns }
        data={ filteredItems }
        noHeader={ true }
        pagination={ true }
        pointerOnHover={ true }
        paginationComponentOptions={ paginationComponentOptions }
        noDataComponent={ noData }
      /> 
    </React.Fragment>
  );
}

export default Table