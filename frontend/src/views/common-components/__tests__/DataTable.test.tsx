import { TableBody } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { render, screen } from '@testing-library/react';
import DataTable from '../DataTable';

const testTitle = 'Test Title';
const testHeaderRow = (
    <TableRow>
        <TableCell>Column1</TableCell>
        <TableCell>Column2</TableCell>
    </TableRow>
);

const testDataRow = (
    <TableBody>
        <TableRow>
            <TableCell>Data1</TableCell>
            <TableCell>Data2</TableCell>
        </TableRow>
    </TableBody>
);

test('Data table correctly shows column headers and data rows', async () => {
    render(
        <DataTable
            title={testTitle}
            headerRow={testHeaderRow}
            dataRow={testDataRow}
            totalElements={1}
            pageSize={1}
            pageNumber={0}
            onChangePage={() => ({})}
        />,
    );
    expect(screen.queryByText('Column1')).toBeTruthy();
    expect(screen.queryByText('Column2')).toBeTruthy();
    expect(screen.queryByText('Data1')).toBeTruthy();
    expect(screen.queryByText('Data2')).toBeTruthy();
});
