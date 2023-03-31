import React, {useState} from "react";

import ThemeProvider from "./context/Theme/Provider";
import {Theme} from "./context/Theme/Context";
import Router from "./pages/Router";


const App = () => {

    const [inputText, setInputText] = useState('')
    const onChange = (value: string) => setInputText(value)

    const [theme, setTheme] = useState(Theme.Light)
    const onChangeTheme = (value: Theme) => {
        setTheme(value);
    };

  return (
      <ThemeProvider theme={theme} onChangeTheme={onChangeTheme}>
          <div>
              <Router/>
          </div>
      </ThemeProvider>
  );
};

export default App;
