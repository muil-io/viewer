import { createGlobalStyle } from 'styled-components';
import scrollbar from './scrollbar';

const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		box-sizing: border-box; // 1
	}

	html, body {
		margin:0;
		padding:0;
		font-family: Roboto;
	}

	body {
		min-width: 900px;
		overflow: auto hidden;
		${scrollbar};
	}

	a {
		text-decoration: none;
	}
`;

export default GlobalStyle;
