import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import user from '@testing-library/user-event';
import useTaskService from '../../../../services/useTaskService';
import LiveTracking from '../LiveTracking';
import { TasksTableData } from '../../../../model/TaskDataModel';

jest.mock('../../../../services/useTaskService');
const mockUseTaskService = useTaskService as jest.MockedFunction<
    typeof useTaskService
>;

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Live tracking page test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Live tracking page shows no data message', async () => {
        const mockGetAllTasks = jest.fn(() => Promise.resolve(emptyTaskList));
        mockUseTaskService.mockReturnValue({
            ...initialMocks,
            getTasks: mockGetAllTasks,
        });
        await renderUserPage();
        expect(mockGetAllTasks).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('img', { name: /no data/i })).toBeVisible();
    });

    test('Live tracking shows data properly', async () => {
        const mockGetAllTasks = jest.fn(() =>
            Promise.resolve(taskListWithData),
        );
        mockUseTaskService.mockReturnValue({
            ...initialMocks,
            getTasks: mockGetAllTasks,
        });
        await renderUserPage();
        expect(screen.queryByRole('img', { name: /no data/i })).toBeFalsy();
        expect(mockGetAllTasks).toHaveBeenCalledTimes(1);
        expect(
            screen.queryByRole('rowheader', { name: /test@gmail\.com/i }),
        ).toBeTruthy();
    });

    test('Delete button works properly', async () => {
        const mockGetTasks = jest
            .fn()
            .mockResolvedValueOnce(taskListWithData)
            .mockResolvedValue(emptyTaskList);
        const mockDeleteTask = jest.fn(() => Promise.resolve());
        mockUseTaskService.mockReturnValue({
            ...initialMocks,
            getTasks: mockGetTasks,
            deleteTask: mockDeleteTask,
        });
        await renderUserPage();
        expect(screen.getByRole('button', { name: /delete/i })).toBeVisible();

        await act(async () => {
            user.click(screen.getByRole('button', { name: /delete/i }));
        });

        expect(
            screen.getByText(/sure want to delete this task\?/i),
        ).toBeVisible();

        await act(async () => {
            user.click(screen.getByRole('button', { name: /delete/i }));
        });

        expect(mockDeleteTask).toHaveBeenCalledTimes(1);
        expect(mockGetTasks).toHaveBeenCalledTimes(2);
    });

    test('Add new ongoing task button works properly', async () => {
        const mockGetTasks = jest.fn(() => Promise.resolve(emptyTaskList));
        const mockCreateTask = jest.fn(() => Promise.resolve());
        mockUseTaskService.mockReturnValue({
            ...initialMocks,
            createTask: mockCreateTask,
            getTasks: mockGetTasks,
        });
        await renderUserPage();

        expect(screen.getByRole('button', { name: /add task/i })).toBeVisible();
        await act(async () => {
            user.click(screen.getByRole('button', { name: /add task/i }));
        });

        expect(screen.getByText(/add a new ongoing task/i)).toBeVisible();

        user.type(
            screen.getByRole('textbox', { name: /description/i }),
            'test-description',
        );
        await act(async () => {
            user.click(screen.getByRole('button', { name: /add/i }));
        });
        expect(mockCreateTask).toHaveBeenCalledTimes(1);
        expect(mockGetTasks).toHaveBeenCalledTimes(2);
    });
});

const renderUserPage = async () => {
    await act(async () => {
        render(
            <Router>
                <LiveTracking />
            </Router>,
        );
    });
};

const emptyTaskList: TasksTableData = {
    taskList: [],
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
};

const taskListWithData: TasksTableData = {
    taskList: [
        {
            id: 1,
            assignee: 'test@gmail.com',
            description: 'my test',
            status: 'ONGOING',
            startTimeInMillis: 1651694288625,
            completionDate: new Date(),
            duration: 2,
            version: 2,
        },
    ],
    pageNumber: 0,
    pageSize: 1,
    totalElements: 1,
    totalPages: 1,
};

const initialMocks = {
    createTask: jest.fn(),
    getTasks: jest.fn(),
    getTaskSummary: jest.fn(),
    deleteTask: jest.fn(),
    updateTask: jest.fn(),
};
