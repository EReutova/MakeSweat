import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --color-eerie-black: #1E1F1E;
    --color-charlestone-green: #2A2B2A;
    --color-davys-grey: #474847;
    --color-silver: #C2C2C2;
    --color-platinum: #EAEBEA;
    --color-red-crayola: #F72E4C;
}
/* --color-red-crayola: #F72E4C;
--color-bitter-lemon: #C2E812;
--color-pine-green: #0B7A75;

:root {
    --color-black-olive: #3A3F3C;
    --color-ebony: #565F5A;
    --color-xanadu: #7C8A82;
    --color-ash-gray: #BFC9C4;
    --color-platinum: #EAEBEA;
    --color-arctic-lime: #C7EE1B;
} */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, select, input {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-size: 100%;
    vertical-align: baseline;
    /* font-family: 'Poppins', sans-serif; */
}
html, body {
    background-color: var(--color-platinum);
}

`;