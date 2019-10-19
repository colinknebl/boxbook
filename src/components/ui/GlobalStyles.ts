import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        --primary-color: rgba(214, 181, 0, 1);
        --primary-color--hover: rgba(244, 207, 0, 1);
        --secondary-color: rgba(0, 35, 132, 1);
        --secondary-color--hover: rgba(2, 48, 176, 1);
        --tertiary-color: rgba(35, 133, 216, 1);
        --tertiary-color--hover: rgba(58, 161, 248, 1);
        --confirm-color: rgba(170, 255, 118, 1);
        --confirm-color--hover: rgba(128, 213, 76, 1);
        --cancel-color: rgba(255, 73, 73, 1);
        --cancel-color--hover: rgba(207, 53, 53, 1);
        --page-padding: 1rem;

        --shadow-dreamy: 
            0 1px 2px rgba(0, 0, 0, 0.07),
            0 2px 4px rgba(0, 0, 0, 0.07),
            0 4px 8px rgba(0, 0, 0, 0.07),
            0 8px 16px rgba(0, 0, 0, 0.07),
            0 16px 32px rgba(0, 0, 0, 0.07),
            0 32px 64px rgba(0, 0, 0, 0.07);
        --shadow-long: 
            0 2px 1px rgba(0,0,0,0.09), 
            0 4px 2px rgba(0,0,0,0.09), 
            0 8px 4px rgba(0,0,0,0.09), 
            0 16px 8px rgba(0,0,0,0.09),
            0 32px 16px rgba(0,0,0,0.09);
        --shadow-short:
            0 1px 1px rgba(0,0,0,0.11), 
            0 2px 2px rgba(0,0,0,0.11), 
            0 4px 4px rgba(0,0,0,0.11), 
            0 6px 8px rgba(0,0,0,0.11),
            0 8px 16px rgba(0,0,0,0.11);
        --shadow-sharp:
            0 1px 1px rgba(0,0,0,0.25), 
            0 2px 2px rgba(0,0,0,0.20), 
            0 4px 4px rgba(0,0,0,0.15), 
            0 8px 8px rgba(0,0,0,0.10),
            0 16px 16px rgba(0,0,0,0.05);
        --shadow-diffuse: 
            0 1px 1px rgba(0,0,0,0.08), 
            0 2px 2px rgba(0,0,0,0.12), 
            0 4px 4px rgba(0,0,0,0.16), 
            0 8px 8px rgba(0,0,0,0.20);

        --white: whitesmoke;
        --black: #333;
        --transition-duration: 200ms;
        --button-border-radius: 10px;

        --background: whitesmoke;
        --text-color: var(--black);
    }

    @media (prefers-color-scheme: dark) {
        /* :root {
            --background: var(--black);
            --text-color: var(--white);
        } */
    }

    * {
        box-sizing: border-box;
    }

    body {
        background: var(--background);
        color: var(--text-color);
        font-size: 16px; 
        font-family: 'Source Sans Pro', sans-serif;
        line-height: 1.4;
        min-height: 100vh;
    }

    .App {
        overflow-x: hidden;
        display: grid;
        grid-template-rows: 60px calc(100vh - 60px);
    }

    button {
        outline-color: var(--primary-color);
        background: inherit;
        cursor: pointer;
    }
`;

export default GlobalStyles;
