import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --color-dark-blue: #003249;
    --color-blue: #007ea7;
    --color-turquoise: #80ced7;
    --color-light-blue: #9ad1d4;
    --color-blue-grey: #ccdbdc;
}

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
    /* background-color: #F6F3F7; */
}

`;