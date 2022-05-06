const htmlOpeningTag = '<!DOCTYPE html> <html lang="en">';
const head = '<head><meta charset="UTF-8"><title>Task Report</title></head>';
const bodyOpeningTag = '<body>';
const bodyClosingTag = '</body>';
const htmlClosingTag = '</html>';

export const buildHtmlFile = (component: any) => {
    const htmlWDoc =
        htmlOpeningTag +
        head +
        bodyOpeningTag +
        component +
        bodyClosingTag +
        htmlClosingTag;

    const documentAsString = `data:text/html;charset=utf-8,${encodeURIComponent(
        htmlWDoc,
    )}`;
    return documentAsString;
};
