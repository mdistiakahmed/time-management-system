export class UiTextMessages {
    static signInPageMessages = {
        title: 'Sign in',
        submitButtonText: 'Sign In',
        switchToSignUpPage: "Don't have an account? Sign Up",
        emailError: 'Please enter an email address',
        passwordError: 'Please enter password',
    };

    static signUpPageMessages = {
        title: 'Sign up',
        submitButtonText: 'Sign Up',
        switchToSignInPage: 'Already have an account? Sign in',
        emailInvalidMessage: 'Invalid Email',
        emailAbsentMessage: 'Email is Required',
        passwordMinLengthError: 'Minimum 6 characters',
        passwordMaxLengthError: 'Maximum 20 characters',
        passwordAbsentMessage: 'Password is Required',
        confirmPasswordErrorMessage: 'Password does not match',
    };

    static historyPageMessages = {
        // create modal
        addTaskButtonText: 'Add Task',
        exportButtonText: 'Export',
        addButtonText: 'Add User',
        taskCreateModalTitle: 'Add a new task',
        descriptionInputLabel: 'Description',
        durationInputLabel: 'Duration in hour',
        modalCloseText: 'Cancel',
        createModalAddText: 'Add',
        dateInvalidMessage: 'Completion date can not be in the future!',
        durationInvalidMessage:
            'Duration should be greater then 0, maximum 1 decimal places and at most 3 months(2160 hour)',
        descriptionInvalidMessage: 'Minimum 6 Characters',

        // filter modal
        startDateLabel: 'Start Date',
        endDateLabel: 'End Date',
        applyButtonText: 'Apply',
        endDateInvalidMessage: 'End date should be after start date',
        startDateInvalidMessage: 'Enter valid start date',

        // update modal
        updateModalTitle: 'Update task',
        updateButtonText: 'Update',

        //Collapsible table
        collapseExpandTitle: 'Task List',
    };

    static liveTrackingPageMessages = {
        addButtonText: 'Add Task',

        // create modal
        createModalTitle: 'Add a new ongoing task',
        descriptionInputLabel: 'Description',
        modalCloseButtonText: 'Cancel',
        modalAddButtonText: 'Add',
        descriptionInvalidMessage: 'Minimum 6 Characters',

        // update modal
        updateModalTitle: 'Sure want to mark this task as done?',
        updateModalOkButtonText: 'Mark as done',

        // delete icon
        deleteIconTooltipText: 'Delete',
        // mark as done icon
        markAsDoneIconToolTipText: 'Mark as done',
    };

    static accountSettingsPage = {
        pageTitle: 'Account Settings',
        preferredWorkingHourInputLabel: 'Preferred Working Hour',
        updateButtonText: 'Update',
        resetButtonText: 'Reset',
        sameContentErrorMessage: 'New settings is same as old settings',
    };

    static userPageMessages = {
        addUserModalTitle: 'Add New User',
        userUpdateModalTitle: 'Update User',
        addButtonText: 'Add User',
        emailInputLabel: 'Email',
        passwordInputLabel: 'Password',
        roleInputLabel: 'Role',
        preferredWorkingHourInputLabel: 'Preferred Working Hour',
        preferredWorkingHourInvalidateMessage:
            'Should be greater then 0 , less then or equal to 24 and max 1 decimal places',
        emailInvalidMessage: 'Invalid Email',
        roleInvalidMessage: 'Please select role',
        passwordInvalidError: 'Minimum Digit 6',
        userDeleteConfirmationTitle: 'User Delete confirmation',
    };

    static httpErrorMessages = {
        error400: 'Invalid Data',
        error401: 'Unauthorized Request',
        error403: 'Access Denied',
        error404: 'Page not found',
        error409: 'Conflicting Data',
        error000: 'Server is not responding, try again',
        errorUnknown: 'Something went wrong. Try again',
    };

    static httpSuccessMessages = {
        //task
        taskCreateSuccess: 'Task Created',
        taskUpdateSuccess: 'Task Updated',
        taskDeleteSuccess: 'Task Deleted',
        //user
        userCreateSuccess: 'User Created',
        userDeleteSuccess: 'User Deleted',
        userUpdateSuccess: 'User Updated',
    };

    static notFoundPageMessages = {
        errorCode: '404',
        errorMessageHeader: "Look like you're lost",
        errorMessageBody: 'The page you are looking for not available!',
        goHomeButtonText: 'Go To Home',
    };
}
