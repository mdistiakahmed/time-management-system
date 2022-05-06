import styled from '@emotion/styled';

const TableContainer = ({
    leftButtons,
    rightButtons,
    table,
}: TableContainerProps) => {
    return (
        <Container>
            <FilterContainer>
                {leftButtons}
                {rightButtons}
            </FilterContainer>
            {table}
        </Container>
    );
};

export default TableContainer;

type TableContainerProps = {
    leftButtons?: JSX.Element;
    rightButtons?: JSX.Element;
    table?: JSX.Element;
};

const Container = styled.div`
    margin: 5px 20px 0px;
    padding: 0px 20px;
    border-radius: 5px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.08);
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #edeef0;
    margin-bottom: 20px;
`;
