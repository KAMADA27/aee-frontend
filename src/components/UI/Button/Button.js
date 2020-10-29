import styled from 'styled-components';

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
  cursor: pointer;
  font: inherit;
  padding: 10px;
  margin: 10px;
  font-weight: bold;
`;

const Success = styled(Button)`
  width: ${ props => props.width };
  border-radius: 5px;
  background-color: #0099cc;
`;

const Danger = styled(Button)`
  width: ${ props => props.width };
  border-radius: 5px;
  background-color: #e60000;
`;

export { Success, Danger };