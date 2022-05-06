import { TaskEntity, TasksTableData } from '../../../model/TaskDataModel';

const Report = (tasksTableData: TasksTableData) => {
    const { taskList } = tasksTableData;
    const completionDateList = taskList.map((item) => item.completionDate);
    const dateSet = new Set();
    completionDateList.forEach((item) => dateSet.add(item));

    const summaryList: TaskEntity[][] = [];
    dateSet.forEach((singleDate) => {
        const newArray = taskList.filter(
            (taskItem) => taskItem.completionDate === singleDate,
        );
        summaryList.push(newArray);
    });
    const finalResult: {
        date: Date;
        total: number;
        descriptionList: string[];
    }[] = [];

    summaryList.forEach((nestedArr) => {
        const date = nestedArr[0].completionDate;
        let total = 0;
        nestedArr.forEach((item) => (total += item.duration));
        const descriptionList = nestedArr.map((item) => item.description);
        const summaryObject = {
            date,
            total,
            descriptionList,
        };
        finalResult.push(summaryObject);
    });

    return (
        <div style={styles.container}>
            <h3>Task Report</h3>
            <table style={styles.table}>
                <colgroup>
                    <col width="20%" />
                    <col width="20%" />
                    <col />
                </colgroup>
                <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Total Working Hour</th>
                    <th style={styles.th}>Note</th>
                </tr>
                {finalResult.map((summary, index) => (
                    <tr key={index}>
                        <td style={styles.td}> {summary.date} </td>
                        <td style={styles.td}>{summary.total} h</td>
                        <td style={styles.td}>
                            {summary.descriptionList.map(
                                (description, index2) => {
                                    return (
                                        <span key={index2} style={styles.span}>
                                            * {description}
                                        </span>
                                    );
                                },
                            )}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default Report;

const styles = {
    container: {
        padding: '10px 5% 60px',
        borderCollapse: 'collapse' as const,
        borderRadius: '5px',
        margin: '0px 40px 0px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        textAlign: 'center' as const,
    },

    table: {
        margin: 'auto',
        width: '90%',
        border: '1px solid #ddd',
        textAlign: 'center' as const,
    },

    th: {
        border: '1px solid #ddd',
        padding: '8px',
        margin: '2px',
        backgroundColor: '#3b3b3b',
        color: 'white',
    },

    td: {
        border: '1px solid #ddd',
        padding: '8px',
        margin: '2px',
        textAlign: 'center' as const,
    },

    span: {
        display: 'block',
        marginBottom: '5px',
        textAlign: 'left' as const,
        '&::before': {
            paddingRight: '10px',
        },
    },
};
