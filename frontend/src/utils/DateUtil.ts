export const formatDate = (date: Date) => {
    return convertToLocalDateIsoString(date).split('T')[0];
};

export const convertToLocalDateIsoString = (date: Date) => {
    return convertToLocalDate(date).toISOString();
};

export const convertToLocalDate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const newDate = new Date(date.getTime() - offset * 60 * 1000);
    return newDate;
};
