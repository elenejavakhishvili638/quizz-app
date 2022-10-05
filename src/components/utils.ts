export const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5)


export const decodeHtml = (html: string) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}