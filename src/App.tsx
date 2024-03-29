import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import ThemeProvider from "./context/Theme/Provider";
import {Theme} from "src/context/Theme/Context";
import Router from "./pages/Router";
import {changeTheme, ThemeSelectors} from "src/redux/reducers/themeSlice";


const App = () => {

    const [inputText, setInputText] = useState('');
    const dispatch = useDispatch();

    const theme = useSelector(ThemeSelectors.getThemeValue);
    const onChangeTheme = (value: Theme) => {
        dispatch(changeTheme(value))
    };
    const onChange = (value: string) => setInputText(value);

  return (
          <ThemeProvider theme={theme} onChangeTheme={onChangeTheme}>
                  <Router/>
          </ThemeProvider>
  );
};


export default App;
