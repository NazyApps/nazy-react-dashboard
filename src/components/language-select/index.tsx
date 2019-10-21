import React, { memo, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { actionCreators } from "common/ducks/config";
import Button from "components/button";
import Icon from "components/icon";
import selectComponentProps from "./selectors";

export interface Props {
  language: string;
  changeLanguage: (payload: string) => void;
}

/* TODO: move to another place */
const languages = ["en", "de"];

export const LanguageSelect: React.FC<Props> = memo(props => {
  const { language, changeLanguage } = props;
  const { i18n, t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <>
      {languages.map(language => (
        <Button
          className="m-2"
          outline
          onClick={() => changeLanguage(language)}
        >
          <Icon name={language} position="left" />
          {t(`language.${language}`)}
        </Button>
      ))}
    </>
  );
});

export default connect(
  selectComponentProps,
  actionCreators
)(LanguageSelect);
